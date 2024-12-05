import React, { useEffect, useState } from 'react';
import ContentDisplay from '../../../common/ContentDisplay/ContentDisplay';
import RecipeCard from '../subcomponents/RecipeCard';

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/recipes');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (recipes.length === 0) return <p>No recipes found!</p>;

  return (
    <ContentDisplay
      title="Featured Recipes"
      items={recipes}
      renderItem={(recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      )}
    />
  );
};

export default FeaturedRecipes;
