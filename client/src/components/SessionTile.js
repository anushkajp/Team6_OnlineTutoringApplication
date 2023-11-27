import React from 'react'

const SessionTile = (props) => {
  return (
    <div className="review_tile">
        <div className="review_details">
          <h4 className="classNameReview">{props.class_name}</h4>
          <h5 className="classNameReview"><span className="header_text">Student Name: </span>{props.student_name}</h5>
          <h5 className="classNameReview"><span className="header_text">Session Time: </span>{props.session_time}</h5>
          <h5 className="classNameReview"><span className="header_text">Comments: </span>{props.session_comments}</h5>
          <h5 className="classNameReview"><span className="header_text">Modality: </span>{props.online ? "online" : "in-person"}</h5>
        </div>
    </div>
  )
}

export default SessionTile;