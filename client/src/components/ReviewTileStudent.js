import React, { useState } from 'react';
import CustomModal from './Modal';

const ReviewTile = (props) => {
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
    <div className="review_tile">
      <div className="review_details">
        <h4 className="classNameReview">{props.class_name}</h4>
        <h5 className="classNameReview">
          <span className="header_text">Tutor: </span>{props.tutorUsername}
        </h5>
        <h5 className="classNameReview">
          <span className="header_text">Rating: </span>{props.rating}/5
        </h5>
        <h5 className="classNameReview">
          <span className="header_text">Description: </span>{props.description}
        </h5>
      </div>
      <button onClick={openModal} className="viewComments">Update</button>

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h4 className="classNameReview">{props.class_name}</h4>
        <h5 className="classNameReview">
          <span className="header_text">Tutor: </span>{props.tutorUsername}
        </h5>

        {/* Rating dropdown for updating */}
        <label className="classNameReview">
          <span className="header_text">Rating: </span>
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
        <label className="classNameReview">
          <span className="header_text">Description: </span>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          ></textarea>
        </label>

        {/* Button to submit the update */}
        <button onClick={handleUpdate}>Submit Update</button>
      </CustomModal>
    </div>
  );
};

export default ReviewTile;
