import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

// Mock the API response
if (process.env.NODE_ENV === 'development') {
  api.interceptors.response.use((response) => {
    // Mock response for the `/recipes` endpoint
    if (response.config.url === '/recipes') {
      return {
        ...response,
        data: [
          {
            id: 1,
            title: 'Recipe 1',
            description: 'Sample recipe 1',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            image: 'https://via.placeholder.com/150', // Add placeholder images
          },
          {
            id: 2,
            title: 'Recipe 2',
            description: 'Sample recipe 2',
            ingredients: ['Ingredient A', 'Ingredient B'],
            image: 'https://via.placeholder.com/150',
          },
        ],
      };
    }
    return response; // Ensure other endpoints behave normally
  }, Promise.reject); // Handle rejections correctly
}

// Define the functions and export them correctly
export const fetchRecipes = () => api.get('/recipes');
export const fetchRecipeById = (id) => api.get(`/recipes/${id}`);
export const saveMealPlan = (data) => api.post('/meal-plans', data);

export default api; // Optionally export the axios instance
