module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    'Recipe',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Cannot be an empty string
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false, // Description is required
      },
     image: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: 'http://localhost:3000/assets/images/default.jpg',
},
      prep_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0, // Must be non-negative
        },
      },
      cook_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      total_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['easy', 'medium', 'hard']], // Must match these values
        },
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // At least 1 serving
        },
      },
      categories: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [], // Defaults to an empty array
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [], // Defaults to an empty array
      },
      inspiration: {
  type: DataTypes.TEXT,
  allowNull: true,
  defaultValue: 'No inspiration provided.',
},
    },
    {
      tableName: 'recipes',
    }
  );



      hooks: {
        beforeCreate(recipe) {
          if (!recipe.total_time) {
            recipe.total_time = recipe.prep_time + recipe.cook_time;
          }
        },
        beforeUpdate(recipe) {
          if (!recipe.total_time) {
            recipe.total_time = recipe.prep_time + recipe.cook_time;
          }
        },
      },
    }
  );

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient, {
      foreignKey: 'recipe_id',
      as: 'ingredients',
    });
    Recipe.hasMany(models.Pairing, {
      foreignKey: 'recipe_id',
      as: 'pairings',
    });
  };

  return Recipe;
};
