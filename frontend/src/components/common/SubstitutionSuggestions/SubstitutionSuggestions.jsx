import React from 'react';
import PropTypes from 'prop-types';
import './SubstitutionSuggestions.css';
import Tooltip from '../Tooltip/Tooltip'; // Assuming Tooltip is a reusable component
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa'; // Icon library for styling

const SubstitutionSuggestions = ({
  substitutions,
  context = 'general',
}) => {
  if (!substitutions || Object.keys(substitutions).length === 0) {
    return null; // Don't render if there are no substitutions
  }

  return (
    <div className="substitution-suggestions">
      <h3 className="substitution-title">
        {context === 'drinks'
          ? 'Drink Alternatives'
          : 'Substitution Suggestions'}
      </h3>
      <ul className="substitution-list">
        {Object.entries(substitutions).map(([key, value]) => (
          <li key={key} className="substitution-item">
            <FaCheckCircle className="substitution-icon" />
            <strong>{key}:</strong> {value}
            <Tooltip
              content={`Substitute ${key} with ${value} in specific scenarios for better results.`}
            >
              <FaInfoCircle className="info-icon" />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

SubstitutionSuggestions.propTypes = {
  substitutions: PropTypes.object.isRequired, // Object with substitution mappings
  context: PropTypes.string, // Optional: context to adapt the component (e.g., "drinks", "sides")
};

export default SubstitutionSuggestions;
