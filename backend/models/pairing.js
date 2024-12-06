module.exports = (sequelize, DataTypes) => {
  const Pairing = sequelize.define('Pairing', {
    pairing_type: DataTypes.STRING,
  });

  Pairing.associate = function (models) {
    Pairing.belongsTo(models.Recipe, {
      foreignKey: 'recipe_id',
      as: 'mainRecipe',
    });
    Pairing.belongsTo(models.Recipe, {
      foreignKey: 'pairing_id',
      as: 'pairedRecipe',
    });
  };

  return Pairing;
};
