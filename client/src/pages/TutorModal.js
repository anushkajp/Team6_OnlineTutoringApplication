import React from "react";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";

export default function TutorModal(props) {
  const { toggle, action, tutorData } = props;
  console.log("TutorModal Data", tutorData);

  if (!tutorData || !toggle) {
    return null;
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
        <div className="txt">{tutorData.firstName} {tutorData.lastName}</div>
        <div className="stars">⭐ {tutorData.rating}</div>
        <p className="bio">{tutorData.longBio}</p>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <p className="c-sub">📚 Choose Subject</p>
        <div className="sub-container">
          {tutorData.courses && Array.isArray(tutorData.courses) ? (
            tutorData.courses.map((course, index) => (
              <div className="box" key={index}>
                {course}
              </div>
            ))
          ) : (
            <p>No courses available!</p>
          )}
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

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
