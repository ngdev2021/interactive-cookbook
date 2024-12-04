import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';
import Card from '../Card/Card';

const RecipeCard = ({ recipe }) => {
  return (
    <Card>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-card-image"
      />
      <div className="card-content">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-description">{recipe.description}</p>
        <Link to={`/recipe/${recipe.id}`}>
          <button className="button-primary">View Recipe</button>
        </Link>
      </div>
    </Card>
  );
};

export default RecipeCard;
