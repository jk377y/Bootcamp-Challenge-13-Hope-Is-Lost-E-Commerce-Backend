const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//! GET route to retreive ALL tags from db
router.get('/', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/" is the endpoint, this will be an async function
  try { 
    const tagData = await Tag.findAll({  // findAll() provided used to retrieve all tags from the database
      include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],   // include option is used to specify that associated Product data should be included in the query results
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! GET route to retreive a single tag from the db
router.get('/:id', async (req, res) => {  // router is an instance of Express Router, "get" means it is retreiving data, "/:id" is requesting a specific item in the endpoint, this will be an async function
try {
  const tagData = await Tag.findByPk(req.params.id, {  // findByPk() provided used to retrieve a single tag from the database
    include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],   // include option is used to specify that associated Product data should be included in the query results
  });
  res.status(200).json(tagData);
} catch (err) {
  console.error(err);
  res.status(500).json({error: err.message});
}
});

//! POST route to create a new tag in the db
router.post('/', async (req, res) => {  // router is an instance of Express Router, "post" means it is adding new data, "/" is the endpoint, this will be an async function
  try {
    const tagData = await Tag.create(req.body)  // uses create() to create a new tag in the db; req.body is used to access the data sent in the request body
    res.status(200).json(tagData)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! PUT route to update a specific tag in the db
router.put('/:id', async (req, res) => {  // router is an instance of Express Router, "put" means it is updating existing data, "/:id" is the endpoint that is specifying which item to update, this will be an async function
  try {
    const tagData = await Tag.update(req.body, {  // uses update() to update a specific tag; req.body is used to access the data sent in the request body
      where: {  // where option is used to specify which tag should be updated based on its id
        id: req.params.id,  // which is passed in the URL as a parameter
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

//! DELETE route to delete a specific id
router.delete('/:id', async (req, res) => {  // router is an instance of Express Router, "delete" means it is deleting existing data, "/:id" is the endpoint that is specifying which item to delete, this will be an async function
  try {
    const tagData = await Tag.destroy({  // destroy() deletes a specific tag identified by its primary key value
      where: {  // where option is used to specify which tag should be deleted based on its id
        id: req.params.id,  // which is passed in the URL as a parameter
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
