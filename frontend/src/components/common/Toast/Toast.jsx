import React from 'react';
import './Toast.css';

const Toast = ({ message, onClose }) => {
  return (
    <div className="toast">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Toast;
