import "./SearchTutor.css";
import React, { useState } from "react";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";
import "font-awesome/css/font-awesome.min.css";

// source used for like button
// https://chayanit-chaisri.medium.com/how-to-add-a-like-button-react-usestate-3f79aac27d90

const SearchTutor = () => {
  const [date, setDate] = useState("Select Date");
  const [subject, setSubject] = useState("Select Subject");
  const [tutor, setTutor] = useState("Select Tutor");
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike((prevLike) => !prevLike);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTutorChange = (event) => {
    setTutor(event.target.value);
  };

  return (
    <div>
      <div className="main-container">
        <div className="main-columns">
          {/* <h2> First column </h2>
          <p> This is First column of our grid system</p> */}
        </div>
        <div className="main-columns">
          {/* <h2> Second column </h2>
          <p> This is Second column of our grid system</p>
 */}
          <p className="find-text">Find your tutor</p>
          <div className="container-filters">
            <div className="box-filters">
              <div className="text-under-find">Date</div>
              <select
                id="filterSelect"
                onChange={handleDateChange}
                value={date}
              >
                <option value="Select Date">Select Date</option>
                <option value="Oct 1">Oct 1</option>
                <option value="Oct 2">Oct 2</option>
                <option value="Oct 3">Oct 3</option>
              </select>
            </div>
            <div class="box-filters">
              <div class="text-under-find">Subject</div>
              <select
                id="filterSelect"
                onChange={handleSubjectChange}
                value={subject}
              >
                <option value="Select Subject">Select Subject</option>
                <option value="CS 1336">CS 1336</option>
                <option value=" CS 2336">CS 2336</option>
                <option value="CS 3345">CS 3345</option>
              </select>
            </div>
            <div class="box-filters">
              <div class="text-under-find">Tutor</div>
              <select
                id="filterSelect"
                onChange={handleTutorChange}
                value={tutor}
              >
                <option value="Select Tutor">Select Tutor</option>
                <option value="Tasnim Mahi">Tasnim Mahi</option>
                <option value="Diana Le">Diana Le</option>
              </select>
            </div>
          </div>

          <div className="tutor-container">
            <div className="tutor-wrapper">
              <div class="left-column">
                <img src={pfp1} className="profile-pic"></img>
                <p className="stars">⭐ ⭐ ⭐ ⭐ ⭐  (489)</p>
              </div>
              <div class="right-column">
                <div class="vertical-component">
                  <p className="name-tutor">Tasnim Mahi</p>
                </div>
                <div class="vertical-component">
                  <p className="subjects">📚 CS 1136, CS 2336</p>
                </div>
                <div class="vertical-component">
                  <p className="bio">
                    Experienced tutor passionate about empowering students to
                    excel in math and computer science through personalized
                    guidance and innovative teaching.
                  </p>
                </div>
                <div class="vertical-component">
                  <p className="heart" onClick={handleLike}>
                    {like ? "♥️" : "♡"}
                  </p>
                </div>
                <div class="vertical-component">
                  <p className="cost">$50</p>
                </div>
                <div class="vertical-component">
                  <p className="per-hour">per hour</p>
                </div>
                <div class="book-button">Book</div>
              </div>
            </div>
            <br></br>
            <div className="tutor-wrapper">
              <div class="left-column">
                <img src={pfp2} className="profile-pic"></img>
                <p className="stars">⭐ ⭐ ⭐ ⭐ ⭐  (20)</p>
              </div>
              <div class="right-column">
                <div class="vertical-component">
                  <p className="name-tutor">Diana Le</p>
                </div>
                <div class="vertical-component">
                  <p className="subjects">📚 CS 3345</p>
                </div>

                <div class="vertical-component">
                  <p className="bio">
                    Experienced tutor passionate about empowering students to
                    excel in math and computer science through personalized
                    guidance and innovative teaching.
                  </p>
                </div>
                <div class="vertical-component">
                  <p className="heart" onClick={handleLike}>
                    {like ? "♥️" : "♡"}
                  </p>
                </div>
                <div class="vertical-component">
                  <p className="cost">$30</p>
                </div>
                <div class="vertical-component">
                  <p className="per-hour">per hour</p>
                </div>
                <div class="book-button">Book</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-columns">
          {/* <h2> Third column </h2>
          <p> This is Third column of our grid system</p> */}
        </div>
      </div>
    </div>
  );
};

export default SearchTutor;
