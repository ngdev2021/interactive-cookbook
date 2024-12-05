import React from 'react';
import './Header.css';

const Header = ({ recipe, onSaveToFavorites }) => (
  <div className="recipe-header">
    {/* Image Section */}
    <div className="image-container">
      <img
        src={recipe.image || '/placeholder-image.jpg'}
        alt={recipe.title || 'Recipe Image'}
        className="recipe-detail-image"
      />
      <span
        className={`difficulty-badge difficulty-${recipe.difficulty.toLowerCase()}`}
      >
        {recipe.difficulty}
      </span>
    </div>

    {/* Summary Section */}
    <div className="recipe-summary">
      <div className="header-actions">
        <button
          className="back-button"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
        <button
          className="favorite-button"
          onClick={onSaveToFavorites}
        >
          Save to Favorites
        </button>
      </div>
      <h1>{recipe.title}</h1>
      <p className="recipe-description">{recipe.description}</p>
      <div className="recipe-details">
        <p>
          <strong>Prep Time:</strong> {recipe.prep_time} mins
        </p>
        <p>
          <strong>Cook Time:</strong> {recipe.cook_time} mins
        </p>
        <p>
          <strong>Total Time:</strong> {recipe.total_time} mins
        </p>
        <div className="rating">
          <strong>Rating:</strong> ★★★★☆ (4.2)
        </div>
      </div>
    </div>
  </div>
);

export default Header;
