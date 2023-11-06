import React, { useState } from 'react';
import CustomModal from './Modal';

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
          <h5 className="classNameReview"><span className="header_text">Student Name: </span>{props.student_name}</h5>
          <h5 className="classNameReview"><span className="header_text">Session Time: </span>{props.session_time}</h5>
          <h5 className="classNameReview"><span className="header_text">Rating: </span>{props.session_rating}/5</h5>
        </div>
        <button onClick={openModal} className="viewComments">view comments</button>

        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <h4 className="classNameReview">{props.class_name}</h4>
          <h5 className="classNameReview"><span className="header_text">Student Name: </span>{props.student_name}</h5>
          <h5 className="classNameReview"><span className="header_text">Session Time: </span>{props.session_time}</h5>
          <h5 className="classNameReview"><span className="header_text">Rating: </span>{props.session_rating}/5</h5>
          <h5 className="classNameReview"><span className="header_text">Comments: </span>{props.session_comments}</h5>
        </CustomModal>
    </div>
  )
}

export default ReviewTile;