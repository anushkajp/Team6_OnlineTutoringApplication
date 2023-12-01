import React, { useState } from 'react';
import { fetchFromAPI, sendAPIPatchRequest } from '../services/api';
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

  // Assuming you have a prop for the user's profile picture URL
  const profilePicUrl = props.profilePicUrl;

  const handleReviewSubmit = () => {
    // Make a POST request to the specified path
    fetchFromAPI(`/review/${props.username}/${props.tutorUsername}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
        reviewText: reviewText,
      }),
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
        <h4>{props.username}</h4>
        <label className="review_details">
          <span className="header_text">Rating</span>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
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
          <textarea
            className="review-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </label>

        {/* Button to submit the review */}
        <button className="add_review" onClick={handleReviewSubmit}>
          Submit
        </button>
      </CustomModal>
    </div>
  );
};

export default AddReview;
