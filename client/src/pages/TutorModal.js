import React, { useState } from "react";
import "./TutorModal.css";
import SearchTutor from "./SearchTutor";
import { TutorTileCard } from "./TutorTile";
import pfp1 from "../assets/Profile_Pic_1.png";

export default function TutorModal(props) {
  const { toggle, action } = props;

  return (
    <div className={`container-modal ${toggle ? "active" : ""}`}>
      <div className="modal">
        <div className="img">
          <img src={pfp1}></img>
        </div>
        <div className="txt">Tasnim Mahi</div>
        <div className="stars">⭐ ⭐ ⭐ ⭐ ⭐ (489)</div>
        <p className="bio">
          Experienced tutor passionate about empowering students to excel in
          math, English language arts, and computer science through personalized
          guidance and innovative teaching.
        </p>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <p className="c-sub">📚 Choose Subject</p>
        <div className="sub-container">
          <div className="box">CS 1336</div>
          <div className="box">CS 2336</div>
        </div>

        <p className="t-sub">⏰ Choose Time</p>
        <div className="time-container">
          <div className="t-box">11 AM</div>
          <div className="t-box">12 PM</div>
        </div>
        <br>
        </br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="close" onClick={action}>
          Cancel
        </div>
        <div className="book">
          Book
        </div>
      </div>
    </div>
  );
}
