import React from 'react';
import Tooltip from '../../../../../common/Tooltip/Tooltip';
import comingSoon from '../../../../../../public/assets/images/coming-soon.png';
import { motion } from 'framer-motion';

const IngredientItem = ({
  ingredient,
  addToShoppingList,
  getFormattedQuantity,
}) => {
  return (
    <motion.li
      className="ingredient-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={ingredient.image || comingSoon}
        alt={ingredient.name}
        className="ingredient-thumbnail lazy-load"
      />
      <span className="ingredient-name">
        {getFormattedQuantity(ingredient)} {ingredient.name}
      </span>
      {ingredient.notes && (
        <Tooltip content={ingredient.notes}>
          <span className="ingredient-notes">
            ({ingredient.notes})
          </span>
        </Tooltip>
      )}
      {ingredient.dietary_restrictions?.length > 0 && (
        <span className="ingredient-restrictions">
          Dietary Info: {ingredient.dietary_restrictions.join(', ')}
        </span>
      )}
      {ingredient.substitutions && (
        <Tooltip
          content={`Substitutes: ${ingredient.substitutions.join(
            ', '
          )}`}
        >
          <span className="ingredient-substitutions">
            (Substitutes Available)
          </span>
        </Tooltip>
      )}
      <button
        className="add-to-shopping-button"
        onClick={() => addToShoppingList(ingredient)}
      >
        Add to Shopping List
      </button>
    </motion.li>
  );
};

export default IngredientItem;
