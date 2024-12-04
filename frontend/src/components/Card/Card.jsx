import React from 'react';
import './Card.css';

const Card = ({ image, title, description, children }) => {
  return (
    <div className="card">
      {image && (
        <img src={image} alt={title} className="card-image" />
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && (
          <p className="card-description">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
