import React from "react";
import "./TutorModal.css";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";

export default function TutorModal(props) {
  const { toggle, action, name, subjects } = props;

  // define tutor-specific info
  const tutors = {
    "Tasnim Mahi": {
      name: "Tasnim Mahi",
      stars: "⭐ ⭐ ⭐ ⭐ ⭐ (489)",
      bio: "Experienced tutor passionate about empowering students to excel in math, English language arts, and computer science through personalized guidance and innovative teaching.",
      subjects: ["CS 1336", "CS 2336"],
      times: ["11 AM", "12 PM"],
    },
    "Diana Le": {
      name: "Diana Le",
      stars: "⭐ ⭐ ⭐ ⭐ ⭐ (20)",
      bio: "Experienced tutor passionate about empowering students to excel in math and computer science through personalized guidance and innovative teaching.",
      subjects: ["CS 3345", "CS 4348"],
      times: ["10 AM", "1 PM"],
    },
  };

  const tutorInfo = tutors[name];

  if (!tutorInfo) {
    // handle the case where name is not found in tutors
    return <div></div>;
  }

  if (!toggle) {
    return null; // don't render the modal if toggle is false
  }

  return (
    <div className={`container-modal ${toggle ? "active" : ""}`}>
      <div className="modal">
        <div className="img">
          {name === "Tasnim Mahi" ? (
            <img src={pfp1} alt="Tutor's Profile Picture" />
          ) : (
            <img src={pfp2} alt="Tutor's Profile Picture" />
          )}
        </div>
        <div className="txt">{tutorInfo.name}</div>
        <div className="stars">{tutorInfo.stars}</div>
        <p className="bio">{tutorInfo.bio}</p>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <p className="c-sub">📚 Choose Subject</p>
        <div className="sub-container">
          {tutorInfo.subjects.map((subject, index) => (
            <div className="box" key={index}>
              {subject}
            </div>
          ))}
        </div>

        <p className="t-sub">⏰ Choose Time</p>
        <div className="time-container">
          {tutorInfo.times.map((time, index) => (
            <div className="t-box" key={index}>
              {time}
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="close" onClick={action}>
          Cancel
        </div>
        <div className="book">Book</div>
      </div>
    </div>
  );
}
