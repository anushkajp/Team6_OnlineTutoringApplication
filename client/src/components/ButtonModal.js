import React, { useState } from 'react';
import Modal from './Modal';
import "../styles/button_modal.css"

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
      <button className="bm_button" onClick={openModal}>{buttonText}</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
         <div className="bm_content">{ modalContent }</div> 
      </Modal>
    </div>
  );
};

export default ButtonModal;
