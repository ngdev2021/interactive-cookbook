'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('recipes', 'image', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust based on whether the column is required
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipes', 'image');
  },
};
