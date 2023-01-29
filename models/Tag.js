const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    //! define columns
    id: {  // column that is labeled as id
      type: DataTypes.INTEGER,  // is an integer
      allowNull: false,  // cannot be null
      primaryKey: true,  // is primary key
      autoIncrement: true,  // auto increments
    },
    tag_name: {  // column that is labeled as tag_name
      type: DataTypes.STRING,  // is a string
    }
  },
  //!=====
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
