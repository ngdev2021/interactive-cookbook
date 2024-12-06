module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    unit: DataTypes.STRING,
    type: DataTypes.STRING,
  });

  Ingredient.associate = function (models) {
    Ingredient.belongsTo(models.Recipe, {
      foreignKey: 'recipe_id',
      as: 'recipe',
    });
    Ingredient.belongsToMany(models.Recipe, {
      through: 'compound_ingredients',
      foreignKey: 'ingredient_id',
      otherKey: 'compound_recipe_id',
      as: 'compoundRecipes',
    });
  };

  return Ingredient;
};
