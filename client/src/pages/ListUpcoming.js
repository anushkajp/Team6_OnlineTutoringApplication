import React,{useEffect, useState} from 'react'
import Sidebar from '../components/sidebar'
import SessionTile from '../components/SessionTile'
import { fetchFromAPI } from '../services/api'

function ListUpcoming(props){

  const [renderSessions, setSessions] = useState([])

  useEffect(() => {
    fetchFromAPI(`appointments/${props.renderType}/${props.userName}`) 
      .then(data => {
          const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          class_name: value.course,
          student_name: props.userName,
          session_time: value.dateTime,
          session_rating: value.rating,
          session_comments: value.notes,
          modality: value.online
        }));
        setSessions(render_data);
      })
      .catch(error => {
        setSessions({
          "key": "Loading...",
          "class_name": "Loading...",
          "student_name": "Loading...",
          "session_time": "Loading...",
          "session_rating": 0,
          "session_comments": "Loading...",
          "modality": "Loading..."
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
        <div className="switchView">
          <nav>
            <a href="/ListUpcoming">List View | </a>
            <a href="/Calendar">Calendar View</a>
          </nav>
        </div>
        <div className="upcomingSessionList">
        {
            Array.isArray(renderSessions) ? renderSessions.map((review, index) => (
              <SessionTile key={index} class_name={review.class_name}
                student_name={review.student_name}
                session_time={review.session_time}
                session_comments={review.session_comments}>
              </SessionTile>
            )) : <h4>You have no upcoming sessions just yet!</h4>
        }
        </div>
      </div>
    </div>
  )
}

export default ListUpcoming
