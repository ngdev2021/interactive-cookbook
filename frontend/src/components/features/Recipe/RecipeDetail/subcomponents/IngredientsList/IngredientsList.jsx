import React, { useState, useEffect } from 'react';
import './IngredientsList.css';
import GroupedIngredients from './GroupedIngredients';
import ShoppingListPreview from './ShoppingListPreview';
import SubstitutionSuggestions from '../../../../../common/SubstitutionSuggestions/SubstitutionSuggestions';

const IngredientsList = ({
  ingredients,
  calculateScaledQuantity,
  substitutions,
}) => {
  const [unitSystem, setUnitSystem] = useState(
    () => localStorage.getItem('unitSystem') || 'metric'
  );
  const [sortOrder, setSortOrder] = useState(
    () => localStorage.getItem('sortOrder') || 'default'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const toggleUnitSystem = () => {
    setUnitSystem((prev) => {
      const newUnitSystem = prev === 'metric' ? 'imperial' : 'metric';
      localStorage.setItem('unitSystem', newUnitSystem);
      return newUnitSystem;
    });
  };

  const updateSortOrder = (order) => {
    setSortOrder(order);
    localStorage.setItem('sortOrder', order);
  };

  const addToShoppingList = (ingredient) => {
    setShoppingList((prev) => [...prev, ingredient]);
  };

  const getFormattedQuantity = (ingredient) => {
    const quantity = calculateScaledQuantity(ingredient);
    const conversionRates = {
      lbs: 0.453592,
      cups: 236.588,
      tbsp: 14.7868,
      tsp: 4.92892,
    };
    if (
      unitSystem === 'metric' &&
      ingredient.unit &&
      conversionRates[ingredient.unit]
    ) {
      return `${(quantity * conversionRates[ingredient.unit]).toFixed(
        2
      )} ml`;
    }
    return `${quantity.toFixed(2)} ${ingredient.unit || ''}`;
  };

  const filterAndSortIngredients = () => {
    return [...ingredients]
      .filter((ingredient) =>
        ingredient.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'alphabetical')
          return a.name.localeCompare(b.name);
        if (sortOrder === 'category')
          return a.type.localeCompare(b.type);
        return 0; // Default order
      });
  };

  return (
    <div className="recipe-ingredients">
      <div className="ingredients-header">
        <h2>Ingredients</h2>
        <div className="actions">
          <button
            className="toggle-unit-button"
            onClick={toggleUnitSystem}
          >
            {unitSystem === 'metric'
              ? 'Switch to Imperial'
              : 'Switch to Metric'}
          </button>
          <select
            onChange={(e) => updateSortOrder(e.target.value)}
            className="sort-dropdown"
            defaultValue="default"
          >
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="category">By Category</option>
          </select>
          <input
            type="text"
            placeholder="Search ingredients..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>
      <GroupedIngredients
        ingredients={filterAndSortIngredients()}
        addToShoppingList={addToShoppingList}
        getFormattedQuantity={getFormattedQuantity}
      />
      <ShoppingListPreview
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
        calculateScaledQuantity={calculateScaledQuantity}
      />
      {substitutions && (
        <SubstitutionSuggestions
          substitutions={substitutions}
          context="ingredients"
        />
      )}
    </div>
  );
};

export default IngredientsList;
