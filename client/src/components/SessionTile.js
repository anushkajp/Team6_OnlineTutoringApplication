import React from 'react'

const SessionTile = (props) => {
  return (
    <div className="review_tile">
      <div className="review_details">
        <h4 className="classNameReview"><span className="header_text">Date and Time: </span>{new Date(props.datetime).toLocaleString()}</h4>
        <h5 className="classNameReview"><span className="header_text">Length: </span>{props.length}</h5>
        <h5 className="classNameReview"><span className="header_text">Location: </span>{props.location}</h5>
        <h5 className="classNameReview"><span className="header_text">Modality: </span>{props.online ? "Online" : "In-person"}</h5>
        <h5 className="classNameReview"><span className="header_text">Student ID: </span>{props.studentId}</h5>
        <h5 className="classNameReview"><span className="header_text">Tutor ID: </span>{props.tutorId}</h5>
      </div>
    </div>

  )
}

export default SessionTile;