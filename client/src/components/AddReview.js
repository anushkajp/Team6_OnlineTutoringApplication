import React, { useState } from 'react';
import { fetchFromAPI, sendAPIPatchRequest } from '../services/api';
import CustomModal from './Modal';

const AddReview = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const numberRange = [1, 2, 3, 4, 5];

  // Assuming you have a prop for the user's profile picture URL
  const profilePicUrl = props.profilePicUrl;

  return (
    <div className="add_review">
      <div className="review_details">
        {/* Circular image of the user's profile picture */}
        <img src={profilePicUrl} alt="Profile" className="profile-pic" />

        {/* User's name */}
        <h4 className="user-name">{props.username}</h4>
      </div>

      {/* Button to open the modal */}
      <button onClick={openModal} className="create_review">
        Add Review
      </button>

      {/* Modal for creating a review */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        {/* Dropdown for selecting the rating */}
        <label className="review_details">
          <span className="header_text">Rating</span>
          <select>
            {numberRange.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </label>

        {/* Textarea for entering the review */}
        <label className="review_details">
          <span className="header_text">Review</span>
          <textarea className="review-textarea"></textarea>
        </label>
      </CustomModal>
    </div>
  );
};

export default AddReview;
