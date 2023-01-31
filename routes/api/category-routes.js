const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//! find all categories
//! be sure to include its associated Products
router.get('/', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/" is the endpoint, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const categoryData = await Category.findAll({  // declares a constant variable named categoryData and assigns the result of calling the Category.findAll() method to it
      include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],  // this line is within the options object passed to the Category.findAll() method. The include property is an array of related models to be included in the results. In this case, it includes the Product model, which is associated with the Category model
    });  // the attribute array is not necessary, but it is included to limit the data returned to the client, can be used to refine query results
    res.status(200).json(categoryData);  // json(categoryData) method is then used to send a JSON response to the client, with the retrieved data categoryData as the response body
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

//! find one category by its `id` value
//! be sure to include its associated Products
router.get('/:id', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/:id" is requesting a specific item in the endpoint, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const categoryData = await Category.findByPk(req.params.id, {  // retrieves the category data from the database using the Sequelize findByPk method
      include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],  // specifies that the related products should also be included in the query and returned with the category data. model: Product is a reference to the Sequelize model that represents the products
    });  // the attribute array is not necessary, but it is included to limit the data returned to the client, can be used to refine query results
    res.status(200).json(categoryData);  // json(categoryData) method is then used to send a JSON response to the client, with the retrieved data categoryData as the response body
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

//! create a new category
router.post('/', async (req, res) => {  // router is an instance of Express Router, "post" means it is adding new data, "/" is the endpoint, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const categoryData = await Category.create(req.body);  // creates a new category in the database using the data passed in the request body (req.body). The resulting data is stored in the categoryData constant
    res.status(200).json(categoryData);  // json(categoryData) method is then used to send a JSON response to the client, with the retrieved data categoryData as the response body
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

//! update a category by its `id` value
router.put('/:id', async (req, res) => {  // router is an instance of Express Router, "put" means it is updating existing data, "/:id" is the endpoint that is specifying which item to update, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const categoryData = await Category.update(req.body, {  // updates the Category data with the values in the request body (req.body)
      where: {  // specifies the condition for the update
        id: req.params.id,  // specifies that the update should only be performed on the Category with the "id" matching the "id" specified in the URL endpoint
      },
    });
    res.status(200).json(categoryData);  // json(categoryData) method is then used to send a JSON response to the client, with the retrieved data categoryData as the response body
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

//! delete a category by its `id` value
router.delete('/:id', async (req, res) => {  // router is an instance of Express Router, "delete" means it is deleting existing data, "/:id" is the endpoint that is specifying which item to delete, this will be an async function
  try {  // try block should handle any errors that occur within this block of code
    const categoryData = await Category.destroy({  // deletes the Category data
      where: {  // specifies the condition for the deletion
        id: req.params.id,  // specifies that the deletion should only be performed on the Category with the "id" matching the "id" specified in the URL endpoint
      },
    });
    res.status(200).json(categoryData);  // json(categoryData) method is then used to send a JSON response to the client, with the retrieved data categoryData as the response body
  } catch (err) {  // if an error occurs above, this will store the error in a variable named err
    console.error(err);  // log the error message
    res.status(500).json({error: err.message});  // return the error message in JSON format
  }
});

module.exports = router;
