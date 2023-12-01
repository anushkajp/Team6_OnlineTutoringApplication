import React,{useEffect, useState} from 'react'
import AddReview from '../components/AddReview'
import { fetchFromAPI } from '../services/api';
import Sidebar from '../components/sidebar';
import ReviewTile from '../components/ReviewTile';

const Reviews = (props) => {
  const [renderSessions, setPrevTutors] = useState([])
  useEffect(() => {
    fetchFromAPI(`appointments/${props.renderType}/${props.userName}`) 
      .then(data => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          tutorId: value.tutorId
        }
        ));
        setPrevTutors(render_data[0]);
      })
      .catch(error => {
        setPrevTutors({
          "tutorId": "Loading..."
        });
        console.log(error);
      });
  }, [props.renderType, props.userName]);
  return (
    <div className="upcomingPage">
      <div className="sidebar">
        <Sidebar renderType={props.renderType}></Sidebar>
      </div>
      <div className="upcomingSession">
        <div className="upcomingSessionList">
        {
            Array.isArray(renderSessions) ? renderSessions.map((review, index) => (
              <AddReview key={index} class_name={review.class_name}
                student_name={review.student_name}
                session_time={review.session_time}
                session_comments={review.session_comments}>
              </AddReview>
            )) : <h4>You have no tutors to review yet!</h4>
        }
        </div>
      </div>
    </div>
  )
}

export default Reviews