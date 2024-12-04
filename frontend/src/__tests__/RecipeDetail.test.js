import { render, screen } from '@testing-library/react';
import RecipeDetail from '../pages/RecipeDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('renders Recipe Detail page', () => {
  const recipe = {
    id: 1,
    title: 'Test Recipe',
    description: 'A sample recipe',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(recipe),
    })
  );

  render(
    <MemoryRouter initialEntries={['/recipe/1']}>
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
