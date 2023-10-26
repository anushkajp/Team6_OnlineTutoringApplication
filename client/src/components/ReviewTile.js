import React from 'react'

const ReviewTile = (props) => {
  return (
    <div className="review_tile">
        <div>
        <h4 className="classNameReview">{props.class_name}</h4>
        <h5 className="classNameReview"><span class="header_text">Student Name: </span>{props.student_name}</h5>
        <h5 className="classNameReview"><span class="header_text">Session Time: </span>{props.session_time}</h5>
        <h5 className="classNameReview"><span class="header_text">Rating: </span>{props.session_rating}/5</h5>
        </div>
        <button className="viewComments">view comments</button>
    </div>
  )
}

export default ReviewTile;