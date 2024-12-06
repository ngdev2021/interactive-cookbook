'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('recipes', 'categories', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn('recipes', 'tags', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn('recipes', 'inspiration', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipes', 'categories');
    await queryInterface.removeColumn('recipes', 'tags');
    await queryInterface.removeColumn('recipes', 'inspiration');
  },
};
