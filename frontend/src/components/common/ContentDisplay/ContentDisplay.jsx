import React from 'react';
import './ContentDisplay.css';

const ContentDisplay = ({ title, items, renderItem }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No items to display</p>;
  }

  return (
    <div className="content-display">
      {title && <h2>{title}</h2>}
      <div className="content-grid">
        {items.map((item, index) => (
          <div className="content-grid-item" key={index}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentDisplay;
