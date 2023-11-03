import React from 'react'

<<<<<<< HEAD
const SessionTile = (props) => {
  return (
    <div className="review_tile">
        <div className="review_details">
          <h4 className="classNameReview">{props.class_name}</h4>
          <h5 className="classNameReview"><span className="header_text">Student Name: </span>{props.student_name}</h5>
          <h5 className="classNameReview"><span className="header_text">Session Time: </span>{props.session_time}</h5>
          <h5 className="classNameReview"><span className="header_text">Comments: </span>{props.session_comments}</h5>
=======
const SessionTile = () => {
  return (
    <div className="session_tile">
        <div className="class_logo">CS</div>
        <div className="tutor_info">
            <h4>AP Computer Science</h4>
            <h6>with Anushka Pimple</h6>
        </div>
        <div className="time_info">
            <h4>Mon, Sep 7</h4>
            <h6>12:30 PM CST (1 hr)</h6>
>>>>>>> e6177d3b242af2febad46e2fe58b888b822b2bf1
        </div>
    </div>
  )
}

export default SessionTile;