import React, { useState } from 'react';
import CustomModal from './Modal';
import { fetchFromAPI } from '../services/api'

const ReviewTile = (props) => {
    
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="review_tile">
        <div className="review_details">
          <h4 className="classNameReview">{props.class_name}</h4>
          <h5 className="classNameReview"><span className="header_text">Student Username: </span>{props.studentId}</h5>
          <h5 className="classNameReview"><span className="header_text">Rating: </span>{props.rating}/5</h5>
          <h5 className="classNameReview"><span className="header_text">Description: </span>{props.description}</h5>

        </div>
        <button onClick={openModal} className="viewComments">view comments</button>

        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <h4 className="classNameReview">{props.class_name}</h4>
          <h5 className="classNameReview"><span className="header_text">Student Username: </span>{props.studentId}</h5>
          <h5 className="classNameReview"><span className="header_text">Rating: </span>{props.rating}/5</h5>
          <h5 className="classNameReview"><span className="header_text">Description: </span>{props.description}</h5>
          <h5 className="classNameReview"><span className="header_text">Comments: </span>{props.session_comments}</h5>
        </CustomModal>
    </div>
  )
}

export default ReviewTile;