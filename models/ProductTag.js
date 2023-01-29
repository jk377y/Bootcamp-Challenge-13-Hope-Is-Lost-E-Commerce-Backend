const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    //! define columns
    id: {  // column that is labeled as id
      type: DataTypes.INTEGER,  // is an integer
      allowNull: false,  // cannot be null
      primaryKey: true,  // is primary key
      autoIncrement: true,  // auto increments
    },
    product_id: {  // column labeled as product_id
      type: DataTypes.INTEGER,  // is an integer
      references: {  // product_id will be a foreign key
        model: 'product',  // that references the product model
        key: 'id',  // in the id column.... product.id
      },
    },
    tag_id: {  // column labeled as tag_id
      type: DataTypes.INTEGER,  // is an integer
      references: {  // tag_id will be a foreign key
        model: 'tag',  // that references the tag model
        key: 'id',  // in the id column.... tag.id
      },
    },
  },
  //!=====
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
