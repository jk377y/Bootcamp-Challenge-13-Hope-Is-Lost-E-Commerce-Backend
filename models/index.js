// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//! Products belongsTo Category
Product.belongsTo(Category, {  // establishes a one-to-many relationship between the Product model and the Category model. This means that each product belongs to a single category, while each category can have multiple products
  foreignKey: 'category_id',  // specifies the foreign key in the Product model that references the primary key of the Category model. This creates a column in the Product table that stores the id of the related Category record
  onDelete: 'CASCADE',  // specifies that if a Category record is deleted, all Product records associated with that category will also be deleted (a "cascade delete")
})

//! Categories have many Products
Category.hasMany(Product, {  // establishes a one-to-many relationship between the Category model and the Product model. This means that each category has many products, while each product belongs to a single category.
  foreignKey: 'category_id',  // specifies the foreign key in the Product model that references the primary key of the Category model. This creates a column in the Product table that stores the id of the related Category record
});

//! Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {  // establishes a many-to-many relationship between the Product model and the Tag model. This means that each product can have many tags and each tag can be associated with many products.
  through: ProductTag,  // specifies a join model, ProductTag, that is used to manage the many-to-many relationship between Product and Tag
  foreignKey: 'product_id'  // specifies the foreign key in the ProductTag model that references the primary key of the Product model. This creates a column in the ProductTag table that stores the id of the related Product record
});

//! Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {  // establishes a many-to-many relationship between the Tag model and the Product model. This means that each tag can be associated with many products and each product can have many tags
  through: ProductTag,  // specifies a join model, ProductTag, that is used to manage the many-to-many relationship between Tag and Product
  foreignKey: 'tag_id'  // specifies the foreign key in the ProductTag model that references the primary key of the Tag model. This creates a column in the ProductTag table that stores the id of the related Tag record
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};