import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../../../../../common/Timer/Timer';
import { motion, AnimatePresence } from 'framer-motion';
import './InstructionsList.css';
import comingSoon from '../../../../../../public/assets/images/coming-soon.png';

const InstructionsList = ({
  instructions,
  completedSteps,
  toggleStepCompletion,
}) => (
  <div className="instructions-section">
    <h2>Instructions</h2>
    <ol>
      <AnimatePresence>
        {instructions.map((step, index) => (
          <motion.li
            key={index}
            className={`instruction-item ${
              completedSteps.includes(index) ? 'completed' : ''
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="instruction-header">
              <input
                type="checkbox"
                id={`step-${index}`}
                checked={completedSteps.includes(index)}
                onChange={() => toggleStepCompletion(index)}
              />
              <label htmlFor={`step-${index}`}>{`Step ${
                index + 1
              }`}</label>
            </div>
            <div className="instruction-content">
              <p>{step.instruction}</p>
              {step.tip && (
                <p className="instruction-tip">
                  <strong>Tip:</strong> {step.tip}
                </p>
              )}
              {step.timer && (
                <Timer
                  duration={step.timer.duration * 60}
                  onComplete={() =>
                    alert(`Timer for Step ${index + 1} completed!`)
                  }
                  label={`Step ${index + 1} Timer`}
                />
              )}

              <img
                key={`step-photo-${index}`}
                src={step.media?.step_photo || comingSoon}
                alt={`Step ${index + 1}`}
                className="instruction-image lazy-load"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = comingSoon;
                  console.warn(
                    `Image failed to load for step ${
                      index + 1
                    }, using fallback.`
                  );
                }}
              />
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  </div>
);

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(
    PropTypes.shape({
      instruction: PropTypes.string.isRequired,
      tip: PropTypes.string,
      timer: PropTypes.shape({
        duration: PropTypes.number.isRequired,
      }),
      media: PropTypes.shape({
        step_photo: PropTypes.string,
      }),
    })
  ).isRequired,
  completedSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleStepCompletion: PropTypes.func.isRequired,
};

export default InstructionsList;
