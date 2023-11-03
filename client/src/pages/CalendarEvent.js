import React from "react";
import "./Calendar.css";

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
