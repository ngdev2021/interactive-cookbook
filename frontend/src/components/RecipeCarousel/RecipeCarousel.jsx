import ContentDisplay from './ContentDisplay';
import RecipeCard from './RecipeCard';

const RecipeCarousel = ({ recipes }) => {
  return (
    <ContentDisplay
      title="Popular Recipes"
      items={recipes}
      renderItem={(recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      )}
      layout="carousel"
    />
  );
};

export default RecipeCarousel;
