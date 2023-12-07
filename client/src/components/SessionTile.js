import React from 'react';

const SessionTile = (props) => {
  return (
    <div className="session_tile">
        <div className="session_details">
          <h4 className="classNameSession"><span className="header_text">Date and Time: </span>{new Date(props.datetime).toLocaleString()}</h4>
          <h5 className="classNameSession"><span className="header_text">Length: </span>{props.length} minutes</h5>
          <h5 className="classNameSession"><span className="header_text">Location: </span>{props.location}</h5>
          <h5 className="classNameSession"><span className="header_text">Student Name: </span>{props.studentId}</h5>
          <h5 className="classNameSession"><span className="header_text">Tutor Rating: </span>{props.tutorId}/5</h5>
          <h5 className="classNameSession"><span className="header_text">Modality: </span>{props.online ? "Online" : "In-person"}</h5>
        </div>
    </div>
  )
}

export default SessionTile;