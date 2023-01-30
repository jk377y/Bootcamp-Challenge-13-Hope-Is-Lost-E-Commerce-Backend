const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

//! get all products
//! find all products
//! be sure to include its associated Category and Tag data
router.get('/', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/" is the endpoint, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const productData = await Product.findAll({  // declares a constant variable named productData and assigns the result of calling the Product.findAll() method to it
      include: [{model: Category}, {model: Tag,}],  // specifies that the Category and Tag data should be included in the retrieval
    });
    res.status(200).json(productData);  // json(productData) method is then used to send a JSON response to the client, with the retrieved data productData as the response body
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

//! get one product
//! find a single product by its `id`
//! be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/:id" is requesting a specific item in the endpoint, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const productData = await Product.findByPk(req.params.id, {  // retrieves the product data from the database using the Sequelize findByPk method (primary key)
      include: [{model: Category}, {model: Tag}],  // specifies that the Category and Tag data should be included in the retrieval
    });
    res.status(200).json(productData);  // sends a JSON response to the client with a status code of 200 and the data stored in the productData constant. The json method is used to convert the productData object to JSON format and set the response content type to application/json
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]  //! <=====
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//! delete one product by its `id` value
router.delete('/:id', async (req, res) => {  // router is an instance of Express Router, "delete" means it is deleting existing data, "/:id" is the endpoint that is specifying which item to delete, this will be an async function
  try {  // try block handles any potential errors during the execution of the code
    const productData = await Product.destroy({  // destroy() deletes a specific Product identified by its primary key value
      where: {  // where option is used to specify which product should be deleted based on its id
        id: req.params.id,  // this is the id that will be deleted, which is passed from the URL as a parameter
      },
    });
    res.status(200).json(productData);  // sends a JSON response to the client with a status code of 200 and the data stored in the productData constant. The json method is used to convert the productData object to JSON format and set the response content type to application/json
  } catch (err) {  // try block should handle any errors that occur within this block of code
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

module.exports = router;
