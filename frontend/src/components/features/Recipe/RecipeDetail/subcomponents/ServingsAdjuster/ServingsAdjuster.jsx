import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServingsAdjuster.css';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'; // Icons for interactivity

const ServingsAdjuster = ({
  servings,
  setServings,
  minServings = 1,
  maxServings = 20,
}) => {
  const [error, setError] = useState('');

  const handleIncrease = () => {
    if (servings < maxServings) {
      setServings(servings + 1);
      setError('');
    } else {
      setError(`Maximum servings is ${maxServings}.`);
    }
  };

  const handleDecrease = () => {
    if (servings > minServings) {
      setServings(servings - 1);
      setError('');
    } else {
      setError(`Minimum servings is ${minServings}.`);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < minServings) {
      setError(`Minimum servings is ${minServings}.`);
    } else if (value > maxServings) {
      setError(`Maximum servings is ${maxServings}.`);
    } else {
      setError('');
      setServings(value);
    }
  };

  return (
    <div className="servings-adjuster">
      <label htmlFor="servings">Adjust Servings:</label>
      <div className="adjuster-controls">
        <button
          type="button"
          className="adjust-button decrease"
          onClick={handleDecrease}
          disabled={servings <= minServings}
        >
          <FaMinusCircle />
        </button>
        <input
          type="number"
          id="servings"
          value={servings}
          onChange={handleInputChange}
          min={minServings}
          max={maxServings}
        />
        <button
          type="button"
          className="adjust-button increase"
          onClick={handleIncrease}
          disabled={servings >= maxServings}
        >
          <FaPlusCircle />
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

ServingsAdjuster.propTypes = {
  servings: PropTypes.number.isRequired, // Current servings value
  setServings: PropTypes.func.isRequired, // Function to update servings
  minServings: PropTypes.number, // Minimum allowable servings
  maxServings: PropTypes.number, // Maximum allowable servings
};

export default ServingsAdjuster;
