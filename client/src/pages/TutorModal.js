import React, { useEffect, useState } from "react";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";
import { uploadToAPI } from "../services/api";

export default function TutorModal(props) {
  const { toggle, action, tutorData, availabilityData, date } = props;
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(null);
  const [activeTimeIndex, setActiveTimeIndex] = useState(null);
  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const [convertedTime, setConvertedTime] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.email)

  function convertTo24HourFormat(timeString) {
    // Split the string to get the start time and AM/PM part
    const [timePart, amPmPart] = timeString.split('-')[0].trim().split(' ');
    
    // Extract hours and minutes from the time part
    let [hours, minutes] = timePart.split(':').map(Number);

    // Convert to 24-hour format
    if (amPmPart === 'PM' && hours < 12) {
      hours += 12;
    } else if (amPmPart === 'AM' && hours === 12) {
      hours = 0;
    }

    // Format the hours and minutes correctly
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    console.log(`${formattedHours}:${formattedMinutes}:00`);
    return `${formattedHours}:${formattedMinutes}:00`;
}


  const handleBoxS = (index) => {
    setActiveSubjectIndex(index === activeSubjectIndex ? null : index);
    setSubject(tutorData.courses[index]);
    console.log(tutorData.courses[index]);
  };

  const handleBoxT = (index) => {
    setActiveTimeIndex(index === activeTimeIndex ? null : index);
    setTime(availabilityData[index]);
    const newConvertedTime = convertTo24HourFormat(availabilityData[index]);
    setConvertedTime(newConvertedTime);
  };

  if (!tutorData || !toggle) {
    return null;
  }

  const handleCreateAppointment = async () => {
    if (!subject || !time) {
      alert("Please select a subject and time before booking!");
      return;
    }

    const appointmentDateTime = `${date}T${convertedTime}`;
    
    const appointmentData = {
      datetime: appointmentDateTime,
      length: 60,
      course: subject,
      location: "www.zoom.com",
      online: true,
      studentUsername: user.email, 
      tutorUsername: tutorData.username, 
    };

    try {
      const response = await uploadToAPI("appointments", appointmentData);
      console.log("Appointment created:", response);
      alert("Booked!");
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
