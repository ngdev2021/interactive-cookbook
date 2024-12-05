import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ShoppingListPreview.css';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const getGroceryStoreSize = (name, quantity, unit, options = {}) => {
  const storeQuantities = {
    salt: { unit: 'bottle', size: 1 },
    butter: { unit: 'pack', size: 0.25 },
    milk: { unit: 'gallon', size: 1 },
    sugar: { unit: 'bag', size: 5 },
    eggs: { unit: 'dozen', size: 12 },
    apple: { unit: 'pieces', size: 1 },
    rice: { unit: 'bag', size: 5 },
    flour: { unit: 'bag', size: 5 },
    soda: { unit: 'bottle', size: 2 },
    wine: { unit: 'bottle', size: 0.75 },
  };

  const fallbackUnit = options.fallbackUnit || 'unit';
  const normalizeName = name.toLowerCase();
  const item = storeQuantities[normalizeName];

  if (!name || quantity <= 0) {
    throw new Error(
      'Invalid input: Name and positive quantity are required.'
    );
  }

  if (item) {
    const { unit: storeUnit, size } = item;
    const requiredPackages = Math.ceil(quantity / size);
    return {
      name,
      recommendedSize: `${requiredPackages} ${storeUnit}`,
      leftover:
        quantity % size ? `${quantity % size} ${unit || ''}` : null,
    };
  }

  return {
    name,
    recommendedSize: `${quantity} ${unit || fallbackUnit}`,
    leftover: null,
  };
};

const ShoppingListPreview = ({
  shoppingList,
  setShoppingList,
  calculateScaledQuantity,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);

  // Save progress and shopping list to localStorage
  useEffect(() => {
    localStorage.setItem(
      'shoppingList',
      JSON.stringify(shoppingList)
    );
    localStorage.setItem(
      'completedItems',
      JSON.stringify(completedItems)
    );
  }, [shoppingList, completedItems]);

  // Load completed items from localStorage
  useEffect(() => {
    const savedCompletedItems =
      JSON.parse(localStorage.getItem('completedItems')) || [];
    setCompletedItems(savedCompletedItems);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedList = Array.from(shoppingList);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);
    setShoppingList(reorderedList);
  };

  const removeItem = (index) => {
    const removedItem = shoppingList[index];
    setShoppingList((prev) => prev.filter((_, i) => i !== index));
    setRecentlyDeleted(removedItem);
    setTimeout(() => setRecentlyDeleted(null), 5000);
  };

  const undoRemove = () => {
    if (recentlyDeleted) {
      setShoppingList((prev) => [...prev, recentlyDeleted]);
      setRecentlyDeleted(null);
    }
  };

  const toggleComplete = (index) => {
    setCompletedItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const progress = Math.round(
    (completedItems.length / shoppingList.length) * 100
  );

  const filteredList = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="shopping-list-preview">
      <div className="shopping-list-header">
        <h3>Shopping List</h3>
        <input
          type="text"
          placeholder="Filter items..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
        <span>{progress}% completed</span>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="shoppingList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="shopping-list-items"
            >
              {filteredList.map((item, index) => {
                const storeSize = getGroceryStoreSize(
                  item.name,
                  calculateScaledQuantity(item),
                  item.unit
                );

                return (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`shopping-list-item ${
                          completedItems.includes(index)
                            ? 'completed-item'
                            : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={completedItems.includes(index)}
                          onChange={() => toggleComplete(index)}
                          className="complete-checkbox"
                        />
                        <span className="editable-item">
                          {item.name}
                        </span>
                        <span className="store-quantity">
                          {storeSize.recommendedSize}
                        </span>
                        <button
                          onClick={() => removeItem(index)}
                          className="remove-item-button"
                        >
                          Remove
                        </button>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {recentlyDeleted && (
        <div className="undo-notification">
          <p>
            Item removed. <button onClick={undoRemove}>Undo</button>
          </p>
        </div>
      )}
    </div>
  );
};

ShoppingListPreview.propTypes = {
  shoppingList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unit: PropTypes.string,
    })
  ).isRequired,
  setShoppingList: PropTypes.func.isRequired,
  calculateScaledQuantity: PropTypes.func.isRequired,
};

export default ShoppingListPreview;
