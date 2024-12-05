import React from 'react';
import './Modal.css';
import { FiX } from 'react-icons/fi';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FiX />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
