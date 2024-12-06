import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './subcomponents/Header/Header';
import ServingsAdjuster from './subcomponents/ServingsAdjuster/ServingsAdjuster';
import IngredientsList from './subcomponents/IngredientsList/IngredientsList';
import InstructionsList from './subcomponents/InstructionsList/InstructionsList';
import ReviewsSection from './subcomponents/ReviewsSection/ReviewsSection';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [drink, setDrink] = useState(null);
  const [side, setSide] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [seasoningBlend, setSeasoningBlended] = useState(null);
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
        console.log('Recipe:', data);
        setRecipe(data);
        setServings(data.default_servings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDrinks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/drinks/${id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch drink details');
        const data = await response.json();

        if (!data.default_servings) {
          data.default_servings = data.servings || 1; // Infer from servings
        }

        if (data.ingredients) {
          data.ingredients = enrichIngredients(data.ingredients);
        }
        console.log('Drink:', data);
        setDrink(data);
        setServings(data.default_servings);
      } catch (err) {
        console.error('Error fetching drink:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSide = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/sides/${id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch side details');
        const data = await response.json();

        if (!data.default_servings) {
          data.default_servings = data.servings || 1; // Infer from servings
        }

        if (data.ingredients) {
          data.ingredients = enrichIngredients(data.ingredients);
        }
        console.log('Side:', data);
        setSide(data);
        setServings(data.default_servings);
      } catch (err) {
        console.error('Error fetching side:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSauce = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/sauces/${id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch sauce details');
        const data = await response.json();

        if (!data.default_servings) {
          data.default_servings = data.servings || 1; // Infer from servings
        }

        if (data.ingredients) {
          data.ingredients = enrichIngredients(data.ingredients);
        }
        console.log('Sauce:', data);
        setSauce(data);
        setServings(data.default_servings);
      } catch (err) {
        console.error('Error fetching sauce:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSeasoningBlend = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/seasoning_blends/${id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch seasoning blend details');
        const data = await response.json();

        if (!data.default_servings) {
          data.default_servings = data.servings || 1; // Infer from servings
        }

        if (data.ingredients) {
          data.ingredients = enrichIngredients(data.ingredients);
        }
        console.log('Seasoning Blend:', data);
        setSeasoningBlended(data);
        setServings(data.default_servings);
      } catch (err) {
        console.error('Error fetching seasoning blend:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
    fetchDrinks();
    fetchSide();
    fetchSauce();
    fetchSeasoningBlend();
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

  const handleRatingSubmit = (event) => {
    if (!event) {
      console.error(
        'Event is undefined. Ensure the onSubmit handler passes the event.'
      );
      return;
    }

    event.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and a comment!');
      return;
    }

    const newReview = { rating, comment };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setRating(0);
    setComment('');
  };

  if (loading)
    return <div className="loader">Loading recipe details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="recipe-detail">
      <Header recipe={recipe} onSaveToFavorites={saveToFavorites} />
      <ServingsAdjuster
        servings={servings}
        setServings={setServings}
      />
      <IngredientsList
        ingredients={recipe.ingredients}
        calculateScaledQuantity={calculateScaledQuantity}
        substitutions={recipe.substitutions}
      />
      <InstructionsList
        instructions={recipe.instructions}
        timers={timers}
        completedSteps={completedSteps}
        toggleStepCompletion={toggleStepCompletion}
        handleStartTimer={handleStartTimer}
        handlePauseTimer={handlePauseTimer}
        resetTimer={resetTimer}
        formatTime={formatTime}
      />
      <ReviewsSection
        reviews={reviews}
        rating={rating}
        comment={comment}
        handleRatingSubmit={handleRatingSubmit}
        setRating={setRating}
        setComment={setComment}
      />
    </div>
  );
};

export default RecipeDetail;
