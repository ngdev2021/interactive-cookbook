import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  // Fetch audio file
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
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/recipes/${id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch recipe details');
        const data = await response.json();
        setRecipe(data);

        // Load timers from localStorage or initialize
        const savedTimers =
          JSON.parse(localStorage.getItem(`timers-${id}`)) || {};
        const initialTimers = {};

        data.instructions.forEach((step, index) => {
          const savedTimer = savedTimers[index];
          if (step.timer) {
            initialTimers[index] = savedTimer || {
              time: step.timer.duration * 60,
              running: false,
              adjustable: step.timer.adjustable,
            };
          }
        });
        setTimers(initialTimers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    // Save timers to localStorage whenever they change
    localStorage.setItem(`timers-${id}`, JSON.stringify(timers));
  }, [timers, id]);

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

            // Play sound when timer ends
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

  const adjustTimer = (index, adjustment) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [index]: {
        ...prevTimers[index],
        time: Math.max(0, prevTimers[index].time + adjustment * 60),
      },
    }));
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
    const completedSteps = Object.values(timers).filter(
      (timer) => timer.time === 0
    ).length;
    return Math.round(
      (completedSteps / recipe.instructions.length) * 100
    );
  };

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found!</p>;

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
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="progress-tracker">
        <h2>Recipe Progress</h2>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <p>{calculateProgress()}% Complete</p>
      </div>

      {/* Instructions */}
      <div className="instructions-section">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>
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
                      {timers[index]?.running ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={() => resetTimer(index)}>
                      Reset
                    </button>
                    {timers[index]?.adjustable && (
                      <>
                        <button onClick={() => adjustTimer(index, 1)}>
                          +1 min
                        </button>
                        <button
                          onClick={() => adjustTimer(index, -1)}
                        >
                          -1 min
                        </button>
                      </>
                    )}
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
    </div>
  );
};

export default RecipeDetail;
