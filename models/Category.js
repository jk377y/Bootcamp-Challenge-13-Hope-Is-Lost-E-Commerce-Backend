const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    //! define columns
    id: {  // column that is labeled as id
      type: DataTypes.INTEGER,  // is an integer
      allowNull: false,  // cannot be null
      primaryKey: true,  // is primary key
      autoIncrement: true,  // auto increments
    },
    category_name: {  // column that is labeled category_name
      type: DataTypes.STRING,  // is a string
      allowNull: false,  // cannot be null
    },
  },
  //!=====
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
