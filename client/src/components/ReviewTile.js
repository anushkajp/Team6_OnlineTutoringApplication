import React, { useState } from 'react';
import CustomModal from './Modal';

const ReviewTile = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="review_tile">
      <div className="review_details">
        <h5 className="classNameReview"><span className="header_text">Student Username: </span>{props.studentId}</h5>
        <h5 className="classNameReview"><span className="header_text">Tutor Username: </span>{props.tutorId}</h5>
        <h5 className="classNameReview"><span className="header_text">Rating: </span>{props.rating}/5</h5>
      </div>
      <button onClick={openModal} className="viewComments">View Comments</button>

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="modalContent">
          <h5 className="classNameReview"><span className="header_text">Student Username: </span>{props.studentId}</h5>
          <h5 className="classNameReview"><span className="header_text">Tutor Username: </span>{props.tutorId}</h5>
          <h5 className="classNameReview"><span className="header_text">Rating: </span>{props.rating}/5</h5>
          <h5 className="classNameReview"><span className="header_text">Comments: </span>{props.description}</h5>
        </div>
      </CustomModal>
    </div>
  )
}

export default ReviewTile;