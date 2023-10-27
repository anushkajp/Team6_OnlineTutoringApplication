import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
    >
      <div>
        <button onClick={onRequestClose}>Close Modal</button>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;