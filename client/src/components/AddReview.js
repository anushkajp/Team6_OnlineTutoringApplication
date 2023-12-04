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
    fetchFromAPI(`/review/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
        description: reviewText,
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
    <div className='add_review_tile'>
      <div>
        {/* Circular image of the user's profile picture */}
        <div className='pfp'>
          <img src="https://picsum.photos/400/400" alt="Profile" />
        </div>
        

        {/* User's name */}
        <h4>{props.username}</h4>
      
        {/* Button to open the modal */}
        <button className = 'button_center' onClick={openModal}>
          Add Review
        </button>
      </div>
      {/* Modal for creating a review */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        {/* Dropdown for selecting the rating */}
        <h4>{props.username}</h4>
        <label>
          <span>Rating</span>
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
        <label>
          <span>Review</span>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </label>

        {/* Button to submit the review */}
        <button className = 'button' onClick={handleReviewSubmit}>
          Submit
        </button>
      </CustomModal>
    </div>
  );
};

export default AddReview;
