// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    //! define columns
    id: {  // column labeled id
      type: DataTypes.INTEGER,  // is an integer
      allowNull: false,  // cannot be null
      primaryKey: true,  // is primary key
      autoIncrement: true,  // auto increments
    },
    product_name: {  // column labeled product_name
      type: DataTypes.STRING,  // is a string
      allowNull: false,  // cannot be null
    },
    price: {  // column labeled price
      type: DataTypes.DECIMAL(10, 2),  // A decimal column with a precision of 10 and a scale of 2 (meaning 10 digits total with 2 coming after the decimal point.  largest possible number would be 99999999.99)
      allowNull: false,  // cannot be null
      validate: {  // has a validation rule
        isDecimal: true,  // rule is that price must be a decimal value
      },
    },
    stock: {  // column labeled stock
      type: DataTypes.INTEGER,  // is an integer
      allowNull: false,  // cannot be null
      defaultValue: 10,  // quantity set to 10 by default
      validate: {  // has a validation rule
        isNumeric: true,  // rule is that stock must be a numeric value
      },
    },
    category_id: {  // column labeled category_id
      type: DataTypes.INTEGER,  // is an integer
      references: {  // category_id will be a foreign key
        model: 'category',  // that references the category model
        key: 'id',  // in the id column.... category.id
      },
    },
  },
  //!=====
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
