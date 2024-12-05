import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timers, setTimers] = useState({});
  const [servings, setServings] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');

  const validateRecipeData = (recipe) => {
    const requiredFields = [
      'title',
      'servings',
      'ingredients',
      'instructions',
    ];
    requiredFields.forEach((field) => {
      if (!recipe[field]) {
        console.warn(`Missing required field: ${field}`);
      }
    });
  };

  const scalingModifiers = {
    liquid: 1.0,
    fat: 0.9,
    thickener: 0.8,
    strong_thickener: 0.6,
    leavening: 0.7,
    salt: 0.9,
    sugar: 1.0,
    caramel_sugar: 0.8,
    acid: 0.9,
    spice: 0.7,
    protein: 1.0,
    starch: 1.0,
    soft_starch: 0.9,
    aromatic: 0.8,
    alcohol: 0.9,
    hydrocolloid: 0.5,
    heat_sensitive: 0.8,
    flavor_extract: 0.8,
  };

  const calculateScaledQuantity = (ingredient) => {
    if (!ingredient.quantity || !recipe?.default_servings) {
      return ingredient.optional ? 'Optional' : 0; // Handle optional cases
    }

    const scalingFactor = servings / recipe.default_servings;
    const modifier = scalingModifiers[ingredient.type] || 1;

    const scaledQuantity =
      ingredient.quantity * scalingFactor * modifier;
    return scaledQuantity > 0 ? scaledQuantity : 0; // No negative values
  };

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch('http://localhost:3000/audio');
        if (!response.ok)
          throw new Error('Failed to fetch audio data');
        const data = await response.json();
        const timesUpAudio = data.find(
          (audio) => audio.title === 'Times Up Sound Effect'
        );
        if (timesUpAudio) setAudioUrl(timesUpAudio.audio_url);
      } catch (err) {
        console.error('Error fetching audio:', err);
      }
    };
    fetchAudio();
  }, []);

  useEffect(() => {
    const enrichIngredients = (ingredients) => {
      return ingredients.map((ingredient) => ({
        ...ingredient,
        type: ingredient.type || 'general', // Default type if missing
        quantity: ingredient.quantity || 0, // Default quantity if missing
      }));
    };

    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/recipes/${id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch recipe details');
        const data = await response.json();

        // Ensure default_servings exists
        if (!data.default_servings) {
          data.default_servings = data.servings || 1; // Infer from servings
        }

        // Validate and enrich ingredients
        if (data.ingredients) {
          data.ingredients = enrichIngredients(data.ingredients);
        }

        setRecipe(data);
        setServings(data.default_servings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const initializeTimers = (instructions) => {
    const savedTimers =
      JSON.parse(localStorage.getItem(`timers-${id}`)) || {};
    const initialTimers = {};
    instructions.forEach((step, index) => {
      if (step.timer) {
        initialTimers[index] = savedTimers[index] || {
          time: step.timer.duration * 60,
          running: false,
          adjustable: step.timer.adjustable,
        };
      }
    });
    return initialTimers;
  };

  useEffect(() => {
    if (recipe?.instructions) {
      setTimers(initializeTimers(recipe.instructions));
    }
  }, [recipe]);

  useEffect(() => {
    localStorage.setItem(`timers-${id}`, JSON.stringify(timers));
  }, [timers, id]);

  const saveToFavorites = () => {
    const currentFavorites =
      JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...currentFavorites, recipe];
    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );
    setFavorites(updatedFavorites);
  };

  const toggleStepCompletion = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((step) => step !== index)
        : [...prev, index]
    );
  };

  const handleStartTimer = (index) => {
    if (!timers[index]?.running) {
      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const updatedTimers = { ...prevTimers };
          if (updatedTimers[index].time > 0) {
            updatedTimers[index].time -= 1;
          } else {
            clearInterval(interval);
            updatedTimers[index].running = false;

            if (audioUrl) {
              const audio = new Audio(audioUrl);
              audio
                .play()
                .catch((err) =>
                  console.error('Audio play error:', err)
                );
            }
            alert(`Timer for Step ${index + 1} completed!`);
          }
          return updatedTimers;
        });
      }, 1000);
      setTimers((prevTimers) => ({
        ...prevTimers,
        [index]: { ...prevTimers[index], running: true, interval },
      }));
    }
  };

  const handlePauseTimer = (index) => {
    if (timers[index]?.running) {
      clearInterval(timers[index].interval);
      setTimers((prevTimers) => ({
        ...prevTimers,
        [index]: { ...prevTimers[index], running: false },
      }));
    }
  };

  const resetTimer = (index) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [index]: {
        ...prevTimers[index],
        time: recipe.instructions[index].timer.duration * 60,
        running: false,
      },
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!recipe?.instructions) return 0;
    const completedSteps = Object.values(timers).filter(
      (timer) => timer.time === 0
    ).length;
    return Math.round(
      (completedSteps / recipe.instructions.length) * 100
    );
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    const newReview = { rating, comment };
    setReviews([...reviews, newReview]);
    setRating(0);
    setComment('');
  };

  if (loading)
    return <div className="loader">Loading recipe details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="recipe-detail">
      {/* Recipe Header */}
      <div className="recipe-header">
        <img
          src={recipe.image || '/placeholder-image.jpg'}
          alt={recipe.title || 'Recipe Image'}
          className="recipe-detail-image"
        />
        <div className="recipe-summary">
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <p>
            <strong>Prep Time:</strong> {recipe.prep_time} mins
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cook_time} mins
          </p>
          <p>
            <strong>Total Time:</strong> {recipe.total_time} mins
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <button
            className="favorite-button"
            onClick={saveToFavorites}
          >
            Save to Favorites
          </button>
        </div>
      </div>

      {/* Servings Adjuster */}
      <div className="servings-adjuster">
        <label htmlFor="servings">Adjust Servings:</label>
        <input
          type="number"
          id="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
      </div>

      {/* Ingredients Section */}
      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={`${ingredient.name}-${index}`}>
              {calculateScaledQuantity(ingredient).toFixed(2)}{' '}
              {ingredient.unit || ''} {ingredient.name}
              {ingredient.substitutions && (
                <div className="substitutions">
                  Substitutes: {ingredient.substitutions.join(', ')}
                </div>
              )}
            </li>
          ))}
        </ul>
        ; ; ;
        <div>
          <h3>Substitution Suggestions:</h3>
          <ul>
            {Object.entries(recipe.substitutions || {}).map(
              ([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="instructions-section">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={completedSteps.includes(index)}
                onChange={() => toggleStepCompletion(index)}
              />
              <p>{step.instruction}</p>
              {step.tip && (
                <p className="instruction-tip">
                  <strong>Tip:</strong> {step.tip}
                </p>
              )}
              {step.timer && (
                <div className="timer-controls">
                  <CircularProgressbar
                    value={
                      100 -
                      (timers[index]?.time /
                        (step.timer.duration * 60)) *
                        100
                    }
                    text={formatTime(
                      timers[index]?.time || step.timer.duration * 60
                    )}
                    styles={buildStyles({
                      textColor: '#FF914D',
                      pathColor: '#FF914D',
                      trailColor: '#e6e6e6',
                    })}
                  />
                  <div className="timer-buttons">
                    <button onClick={() => handleStartTimer(index)}>
                      Start
                    </button>
                    <button onClick={() => handlePauseTimer(index)}>
                      Pause
                    </button>
                    <button onClick={() => resetTimer(index)}>
                      Reset
                    </button>
                  </div>
                </div>
              )}
              {step.media?.step_photo && (
                <img
                  src={step.media.step_photo}
                  alt={`Step ${index + 1}`}
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Reviews Section */}
      <div className="recipe-reviews">
        <h2>Rate and Review</h2>
        <form onSubmit={handleRatingSubmit}>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value={0}>Select...</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Stars
              </option>
            ))}
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here"
          />
          <button type="submit">Submit Review</button>
        </form>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>Rating:</strong> {review.rating} Stars
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
