import React, { useEffect, useState } from "react";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";
import { postToAPI } from "../services/api";

export default function TutorModal(props) {
  const { toggle, action, tutorData, availabilityData } = props;
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(null);
  const [activeTimeIndex, setActiveTimeIndex] = useState(null);
  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)

  const handleBoxS = (index) => {
    setActiveSubjectIndex(index === activeSubjectIndex ? null : index);
    setSubject(tutorData.courses[index]);
    console.log(tutorData.courses[index]);
  };

  const handleBoxT = (index) => {
    setActiveTimeIndex(index === activeTimeIndex ? null : index);
    setTime(availabilityData[index]);
    console.log(availabilityData[index]);
  };

  if (!tutorData || !toggle) {
    return null;
  }

  const handleCreateAppointment = async () => {
    const appointmentData = {
      datetime: "2016-03-25T12:00:00",
      length: 60,
      location: "www.zoom.com",
      online: true,
      studentUsername: "-NiaOOoy_9GXrSO7EFD5", 
      tutorUsername: tutorData.username, 
    };

    try {
      const response = await postToAPI("appointments", appointmentData);
      console.log("Appointment created:", response);
      // Additional logic after successful appointment creation
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className={`container-modal ${toggle ? "active" : ""}`}>
      <div className="modal">
        <div className="img">
          <img src={pfp1} alt={`${tutorData.name}'s Profile Picture`} />
        </div>
        <div className="txt">
          {tutorData.firstName} {tutorData.lastName}
        </div>
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
              <div
                key={index}
                className={`box ${
                  activeSubjectIndex === index ? "active" : ""
                }`}
                onClick={() => handleBoxS(index)}
              >
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
        <div className="time-container">
          {availabilityData &&
          Array.isArray(availabilityData) &&
          availabilityData.length > 0 ? (
            availabilityData.map((time, index) => (
              <div
                key={index}
                className={`t-box ${activeTimeIndex === index ? "active" : ""}`}
                onClick={() => handleBoxT(index)}
              >
                {time}
              </div>
            ))
          ) : (
            <p>No available times!</p>
          )}
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
        <div className="book" onClick={handleCreateAppointment}>Book</div>
      </div>
    </div>
  );
}
