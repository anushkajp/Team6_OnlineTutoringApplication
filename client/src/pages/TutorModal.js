import React from "react";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";

export default function TutorModal(props) {
  const { toggle, action, tutorData } = props;

  if (!tutorData) {
    // render null or a loading spinner
    return null;
  }

  if (!toggle) {
    return null; // don't render the modal if toggle is false
  }

  return (
    <div className={`container-modal ${toggle ? "active" : ""}`}>
      <div className="modal">
        <div className="img">
          <img
            src={tutorData.pfp}
            alt={`${tutorData.name}'s Profile Picture`}
          />
        </div>
        <div className="txt">{tutorData.name}</div>
        <div className="stars">{tutorData.stars}</div>
        <p className="bio">{tutorData.bio}</p>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <p className="c-sub">📚 Choose Subject</p>
        {/* <div className="sub-container">
          {tutorInfo.courses.map((course, index) => (
            <div className="box" key={index}>
              {course}
            </div>
          ))}
        </div> */}

        <p className="t-sub">⏰ Choose Time</p>
        {/* <div className="time-container">
          {tutorInfo.times.map((time, index) => (
            <div className="t-box" key={index}>
              {time}
            </div>
          ))}
        </div> */}
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
