import React from "react";
import "./Calendar.css";

// CREDIT: https://derrickotte.medium.com/how-to-create-a-calendar-from-scratch-in-react-1f2db197454d

const CalendarEvent = (props) => {
  const events = props.sessions[props.date];

  if (!events) {
    return null;
  }

  const eventArray = Array.isArray(events) ? events : [events];

  return (
    <div>
      {eventArray.map((event, index) => (
        <div className="calendar-box" key={index}>
          <time>{event.time}</time>
          <course-name>{event.coursename}</course-name>
          <person>{event.student}</person>
        </div>
      ))}
    </div>
  );
};

export default CalendarEvent;
