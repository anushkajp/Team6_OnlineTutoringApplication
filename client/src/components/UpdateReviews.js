import React, { useState } from 'react';
import CustomModal from './Modal';
import { sendAPIPatchRequest } from '../services/api';

const UpdateReviews = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(props.rating);
  const [updatedDescription, setUpdatedDescription] = useState(props.description);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (data) => {
    // Make a POST request to the specified path
    sendAPIPatchRequest(`/review/${props.studentUsername}/${data.tutorUsername})`, {
        rating: data.rating,
        description: data.reviewText,
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
    <div>
      <div className='update_review_tile  '>
        <div className='left_column'>
           <h4>
            {props.tutorUsername}
          </h4>
          <div className='rating'>
            {/* <h1>{props.rating}</h1> */}
            <h1>{props.rating}</h1>
          </div>
          
        </div>
        <div className='right_column'>
        <p>
            {props.description}
          </p>
          <button className = 'button_right' onClick={openModal}>Update</button>
          
        </div>
        
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className='modal_container'>
          <div className='left_column'>
            <h4>{props.tutorUsername}</h4>
            <label className='dropdown'>
              <span>Rating: </span>
              <select
                value={updatedRating}
                onChange={(e) => setUpdatedRating(e.target.value)}
              >
                {/* Your rating options here */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          </div>
          <div className='right_column'>
            {/* Textarea for updating description */}
            <label>
              <h5>Description</h5>
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              ></textarea>
            </label>
            {/* Button to submit the update */}
            <button className = 'button_right' onClick={handleUpdate}>Submit Update</button>
          </div>
          
        </div>
      </CustomModal>
    </div>
  );
};

export default UpdateReviews;
