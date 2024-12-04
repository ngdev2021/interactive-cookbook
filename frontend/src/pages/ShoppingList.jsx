import React, { useState } from 'react';

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <input
        type="text"
        placeholder="Add an item"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddItem(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
