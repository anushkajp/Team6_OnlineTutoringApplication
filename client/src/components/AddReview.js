import React, { useState } from 'react';
import { uploadToAPI } from '../services/api';
import CustomModal from './Modal';

const AddReview = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(1); // Default rating is 1
  const [reviewText, setReviewText] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const numberRange = [1, 2, 3, 4, 5];

  const handleReviewSubmit = () => {
    // Make a POST request to the specified path using uploadToAPI
    uploadToAPI(`/review/`, {
      rating: rating,
      description: reviewText,
      tutorId: props.tutorUsername,
      studentId: props.studentUsername
    })
      .then((response) => {
        // Handle the response as needed
        console.log(response);
        // Close the modal after submitting the review
        closeModal();
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };
  

  return (
    <div className='add_review_tile'>
      <div className='center_content'>
        <div className='pfp'>
          <img src="https://picsum.photos/400/400" alt="Profile" />
        </div>
        <h5>{props.tutorUsername}</h5>
        <button className = 'button_center' onClick={openModal}>Add Review</button>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className='modal_container'>
          <h4>{props.tutorUsername}</h4>
          {/* Dropdown for selecting the rating */}
          <div className='right_column'>
            <label><span>Rating</span>
              <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                {numberRange.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='left_column'>
            <label>
              <span>Review</span>
              <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
            </label>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AddReview;
