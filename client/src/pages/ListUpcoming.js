import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import SessionTile from '../components/SessionTile'
import { fetchFromAPI } from '../services/api'

function ListUpcoming(props) {

  const [renderSessions, setSessions] = useState([])

  useEffect(() => {
    fetchFromAPI(`appointments/${props.renderType}/${props.userName}`)
      .then(data => {
        console.log(data)
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          datetime: value.datetime,
          length: value.length,
          location: value.location,
          online: value.online,
          studentId: value.studentId,
          tutorId: value.tutorId
        }));
        setSessions(render_data);
      })
      .catch(error => {
        setSessions({
          datetime: "Loading...",
          length: "Loading...",
          location: "Loading...",
          online: "Loading...",
          studentId: "Loading...",
          tutorId: "Loading..."
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
            <a href="/CalendarPage">Calendar View</a>
          </nav>
        </div>
        <div className="upcomingSessionList">
          {
            Array.isArray(renderSessions) ? renderSessions.map((review, index) => (
              <SessionTile key={index}
                datetime={review.datetime}
                length={review.length}
                location={review.location}
                online={review.online}
                studentId={review.studentId}
                tutorId={review.tutorId}>
              </SessionTile>
            )) : <h4>You have no upcoming sessions just yet!</h4>
          }
        </div>
      </div>
    </div>
  )
}

export default ListUpcoming
