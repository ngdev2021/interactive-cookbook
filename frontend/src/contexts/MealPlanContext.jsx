import React, { createContext, useState } from 'react';

export const MealPlanContext = createContext();

const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({});

  const addRecipeToMealPlan = (day, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), recipe],
    }));
  };

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addRecipeToMealPlan }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

export default MealPlanProvider;
