import { render, screen } from '@testing-library/react';
import MealPlanner from '../pages/MealPlanner';
import { MealPlanContext } from '../contexts/MealPlanContext';

test('renders meal planner with context', () => {
  const mealPlan = { Monday: [{ id: 1, name: 'Sample Recipe' }] };
  const addRecipeToMealPlan = jest.fn();

  render(
    <MealPlanContext.Provider
      value={{ mealPlan, addRecipeToMealPlan }}
    >
      <MealPlanner />
    </MealPlanContext.Provider>
  );

  expect(screen.getByText(/Sample Recipe/i)).toBeInTheDocument();
});
