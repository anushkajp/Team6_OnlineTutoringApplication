import React, { useState } from "react";
import TutorModal from "./TutorModal";

export const TutorTileCard = ({ pfp, stars, name, subjects, bio, cost }) => {
  const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState(false);
  const [likedTutors, setLikedTutors] = useState([]); // store liked tutors in an array
  const [selectedTutorData, setSelectedTutorData] = useState({});

  // Check if bio is empty or undefined
  const hasBio = bio && bio.trim() !== "";

  const handleBook = () => {
    setSelectedTutorData({ pfp, stars, name, subjects, bio, cost });
  };

  const open = () => {
    setModal(true); // Open the modal
  };

  const close = () => {
    setModal(false); // Close the modal
  };

  const handleOpenModal = () => {
    setSelectedTutorData({ pfp, stars, name, subjects, bio, cost });
    setModal(true);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    // Toggle the like state
    setLike((prevLike) => !prevLike);

    // Add or remove the tutor from the likedTutors array
    if (!like) {
      // Add the tutor
      setLikedTutors((prevTutors) => [...prevTutors, name]);
    } else {
      // Remove the tutor
      setLikedTutors((prevTutors) =>
        prevTutors.filter((tutor) => tutor !== name)
      );
    }

    // Log the list of liked tutors
    console.log("Liked Tutors:", likedTutors);
  };

  return (
    <div className="tutor-wrapper">
      <div class="left-column">
        <img src={pfp} className="profile-pic"></img>
        <p className="stars">{stars} stars</p>
      </div>
      <div class="right-column">
        <div class="vertical-component">
          <p className="name-tutor">{name}</p>
        </div>
        <div class="vertical-component">
          <p className="subjects">{subjects}</p>
        </div>
        <div class="vertical-component">
          {hasBio ? bio : <p className="bio">No bio available</p>}
        </div>
        <div class="vertical-component">
          <p className="heart" onClick={handleLike}>
            {like ? "♥️" : "♡"}
          </p>
        </div>
        <div class="book-button" onClick={handleOpenModal} action={handleBook}>
          Book
        </div>
        <TutorModal
          toggle={modal}
          action={close}
          tutorData={selectedTutorData}
        />
      </div>
    </div>
  );
};

export default TutorTileCard;
