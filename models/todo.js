'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    to_do_id: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    brief: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
    reserved_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};