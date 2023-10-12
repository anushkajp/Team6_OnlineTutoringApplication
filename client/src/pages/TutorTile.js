import React, { useState } from "react";
import "./SearchTutor.css";
import "./TutorModal.css";
import TutorModal from "./TutorModal";
import SearchTutor from "./SearchTutor";

export const TutorTileCard = ({ pfp, stars, name, subjects, bio, cost }) => {
  const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState(false);

  function open() {
    setModal(!modal);
  }

  const handleLike = (e) => {
    e.stopPropagation();
    setLike((prevLike) => !prevLike);
  };

  const handleBook = () => {
    setBook((prevBook) => !prevBook);
  };

  return (
    <div className="tutor-wrapper">
      <div class="left-column">
        <img src={pfp} className="profile-pic"></img>
        <p className="stars">{stars}</p>
      </div>
      <div class="right-column">
        <div class="vertical-component">
          <p className="name-tutor">{name}</p>
        </div>
        <div class="vertical-component">
          <p className="subjects">{subjects}</p>
        </div>
        <div class="vertical-component">
          <p className="bio">{bio}</p>
        </div>
        <div class="vertical-component">
          <p className="heart" onClick={handleLike}>
            {like ? "♥️" : "♡"}
          </p>
        </div>
        <div class="vertical-component">
          <p className="cost">${cost}</p>
        </div>
        <div class="vertical-component">
          <p className="per-hour">per hour</p>
        </div>
        <div class="book-button" onClick={open} action={handleBook}>
          Book
        </div>
        <TutorModal toggle={modal} action={open} />
      </div>
    </div>
  );
};

export default TutorTileCard;
