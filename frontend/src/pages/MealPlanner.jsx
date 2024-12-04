import React, { useContext } from 'react';
import { MealPlanContext } from '../contexts/MealPlanContext';

const MealPlanner = () => {
  const { mealPlan, addRecipeToMealPlan } =
    useContext(MealPlanContext);

  const handleAddRecipe = () => {
    const sampleRecipe = { id: 1, name: 'Sample Recipe' };
    addRecipeToMealPlan('Monday', sampleRecipe);
  };

  return (
    <div>
      <h1>Meal Planner</h1>
      <button onClick={handleAddRecipe}>
        Add Sample Recipe to Monday
      </button>
      <div>
        {Object.keys(mealPlan).map((day) => (
          <div key={day}>
            <h2>{day}</h2>
            <ul>
              {mealPlan[day]?.map((recipe) => (
                <li key={recipe.id}>{recipe.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
