import React from "react";
import "./Calendar.css";

const CalendarEvent = (props) => {
  const sessions_info = props.sessions[props.date]; // Get the sessions for the specific date

  if (!sessions_info) {
    return null; // If no sessions for the date, return null
  }

  return (
    <div>
      {Object.entries(sessions_info).map(([date, session]) => (
        <div className="calendar-box" key={date}>
          <time>{session.time}</time>
          <p>{session.coursename}</p> {/* Use lowercase tag name */}
          <p>{session.student}</p> {/* Use lowercase tag name */}
        </div>
      ))}
    </div>
  );
};

export default CalendarEvent;
