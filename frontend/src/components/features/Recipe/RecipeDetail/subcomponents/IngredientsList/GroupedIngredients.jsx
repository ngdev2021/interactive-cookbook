import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IngredientItem from './IngredientItem';

const GroupedIngredients = ({
  ingredients,
  addToShoppingList,
  getFormattedQuantity,
}) => {
  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    acc[ingredient.type] = acc[ingredient.type] || [];
    acc[ingredient.type].push(ingredient);
    return acc;
  }, {});

  return (
    <ul>
      <AnimatePresence>
        {Object.entries(groupedIngredients).map(([type, items]) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="ingredient-group">{type}</h3>
            {items.map((ingredient, index) => (
              <IngredientItem
                key={`${ingredient.name}-${index}`}
                ingredient={ingredient}
                addToShoppingList={addToShoppingList}
                getFormattedQuantity={getFormattedQuantity}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default GroupedIngredients;
