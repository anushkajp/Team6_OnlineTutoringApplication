import React from 'react';
import "../styles/modal.css";
import { XCircle } from "lucide-react";

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  const modalClass = isOpen ? "modal-overlay" : "modal-overlay modal-hidden";

  return (
    <div className={modalClass}>
      <div className="custom_modal">
      <button onClick={onRequestClose} className="modal-close-button">
          <XCircle /> 
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;