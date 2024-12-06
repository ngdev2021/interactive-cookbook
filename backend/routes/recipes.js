const express = require('express');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
} = require('../controllers/recipesController');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);

module.exports = router;
