const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//! find all categories
//! be sure to include its associated Products
router.get('/', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/" is the endpoint, this will be an async function
  try {
    const categoryData = await Category.findAll({  // declares a constant variable named categoryData and assigns the result of calling the Category.findAll() method to it
      include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],  // this line is within the options object passed to the Category.findAll() method. The include property is an array of related models to be included in the results. In this case, it includes the Product model, which is associated with the Category model
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! find one category by its `id` value
//! be sure to include its associated Products
router.get('/:id', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/:id" is requesting a specific item in the endpoint, this will be an async function
  try {
    const categoryData = await Category.findByPk(req.params.id, {  // retrieves the category data from the database using the Sequelize findByPk method
      include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],
    }); 
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! create a new category
router.post('/', async (req, res) => {  // router is an instance of Express Router, "post" means it is adding new data, "/" is the endpoint, this will be an async function
  try {
    const categoryData = await Category.create(req.body);  // creates a new category in the database using the data passed in the request body (req.body). The resulting data is stored in the categoryData constant
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! update a category by its `id` value
router.put('/:id', async (req, res) => {  // router is an instance of Express Router, "put" means it is updating existing data, "/:id" is the endpoint that is specifying which item to update, this will be an async function
  try {
    const categoryData = await Category.update(req.body, {  // updates the Category data with the values in the request body (req.body)
      where: {  // specifies the condition for the update
        id: req.params.id,  // specifies that the update should only be performed on the Category with the "id" matching the "id" specified in the URL endpoint
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! delete a category by its `id` value
router.delete('/:id', async (req, res) => {  // router is an instance of Express Router, "delete" means it is deleting existing data, "/:id" is the endpoint that is specifying which item to delete, this will be an async function
  try {
    const categoryData = await Category.destroy({  // deletes the Category data
      where: {  // specifies the condition for the deletion
        id: req.params.id,  // specifies that the deletion should only be performed on the Category with the "id" matching the "id" specified in the URL endpoint
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
