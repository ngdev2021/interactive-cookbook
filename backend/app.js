const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/recipes', recipeRoutes);

module.exports = app;
