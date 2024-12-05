import React, { useState, useRef } from 'react';
import './Tooltip.css';

const Tooltip = ({
  children,
  content,
  placement = 'top', // 'top', 'right', 'bottom', 'left'
  trigger = 'hover', // 'hover', 'click', 'focus'
  delay = 0, // Delay in milliseconds
  customClass = '',
  showArrow = true, // Show arrow or not
  style = {}, // Inline styles
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(
        () => setIsVisible(true),
        delay
      );
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      clearTimeout(timeoutRef.current);
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible((prev) => !prev);
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setIsVisible(false);
    }
  };

  const positionStyles = () => {
    switch (placement) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'right':
        return {
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: '50%',
          right: '100%',
          transform: 'translateY(-50%)',
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`tooltip-container ${customClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={trigger === 'focus' ? 0 : -1} // Accessibility
      style={style}
    >
      {children}
      {isVisible && (
        <div
          className={`tooltip-box tooltip-${placement}`}
          style={positionStyles()}
        >
          {showArrow && <div className="tooltip-arrow" />}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
