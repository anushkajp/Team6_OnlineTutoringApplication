import React, { useState } from 'react';
import CustomModal from './Modal';

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

  const handleUpdate = () => {
    // You can perform the update logic here, e.g., make an API call
    console.log('Updated Rating:', updatedRating);
    console.log('Updated Description:', updatedDescription);

    // Close the modal after handling the update
    closeModal();
  };

  return (
    <div>
      <div className='update_review_tile  '>
        <h5>
          <span>Tutor: </span>{props.tutorUsername}
        </h5>
        <h5>
          <span>Rating: </span>{props.rating}/5
        </h5>
        <h5>
          <span>Description: </span>{props.description}
        </h5>
        <button className = 'butto_right' onClick={openModal}>Update</button>
      </div>
      

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h4>{props.class_name}</h4>
        <h5>
          <span>Tutor: </span>{props.tutorUsername}
        </h5>

        {/* Rating dropdown for updating */}
        <label>
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

        {/* Textarea for updating description */}
        <label>
          <span>Description: </span>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          ></textarea>
        </label>

        {/* Button to submit the update */}
        <button className = 'button_right' onClick={handleUpdate}>Submit Update</button>
      </CustomModal>
    </div>
  );
};

export default UpdateReviews;
