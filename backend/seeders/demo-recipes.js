'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'recipes',
      [
        {
          id: 1,
          title: 'Classic Southern Fried Chicken Wings',
          description:
            'Crispy, golden-brown wings with a flavorful seasoning blend, served with truffle hot honey drizzle.',
          image:
            'http://localhost:3000/assets/images/main/classic-fried-wings.png',
          prep_time: 20,
          cook_time: 30,
          total_time: 50,
          difficulty: 'medium',
          servings: 4,
          categories: JSON.stringify(['dinner', 'southern', 'fried']),
          tags: JSON.stringify([
            'crispy',
            'comfort food',
            'holiday',
            'luxury',
          ]),
          inspiration:
            'This dish brings the soulful traditions of the South to your kitchen, blending classic techniques with modern flavors.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Honey Garlic Grilled Wings',
          description:
            'Juicy grilled wings glazed with a sweet and savory honey garlic sauce.',
          image:
            'http://localhost:3000/assets/images/main/grilled-honey-garlic-wings.png',
          prep_time: 15,
          cook_time: 25,
          total_time: 40,
          difficulty: 'easy',
          servings: 4,
          categories: JSON.stringify(['dinner', 'grilled', 'summer']),
          tags: JSON.stringify([
            'juicy',
            'savory',
            'outdoor cooking',
          ]),
          inspiration:
            'Inspired by backyard summer BBQs, this recipe balances the sweetness of honey with the bold flavor of garlic.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: 'Smoked BBQ Wings',
          description:
            'Tender wings slow-smoked to perfection with a smoky BBQ rub and sauce.',
          image:
            'http://localhost:3000/assets/images/main/smoked-bbq-wings.png',
          prep_time: 20,
          cook_time: 120,
          total_time: 140,
          difficulty: 'medium',
          servings: 4,
          categories: JSON.stringify(['dinner', 'BBQ', 'smoked']),
          tags: JSON.stringify([
            'smoky',
            'barbecue',
            'weekend cooking',
          ]),
          inspiration:
            'A celebration of classic barbecue techniques, this recipe delivers bold smoky flavors perfect for weekend gatherings.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add additional recipes here
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {});
  },
};
