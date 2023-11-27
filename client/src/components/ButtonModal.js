import React, { useState } from 'react';
import Modal from './Modal';

const ButtonModal = ({ buttonText, modalContent }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>{buttonText}</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          { modalContent }    
      </Modal>
    </div>
  );
};

export default ButtonModal;
