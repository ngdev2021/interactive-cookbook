const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Recipe = sequelize.define(
  'Recipe',
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    prep_time: DataTypes.INTEGER,
    cook_time: DataTypes.INTEGER,
    total_time: DataTypes.INTEGER,
    difficulty: DataTypes.STRING,
    servings: DataTypes.INTEGER,
    categories: DataTypes.JSON,
    tags: DataTypes.JSON,
    inspiration: DataTypes.TEXT,
  },
  {
    tableName: 'recipes',
  }
);

module.exports = { sequelize, Recipe };
