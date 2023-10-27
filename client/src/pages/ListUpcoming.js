import React,{useEffect, useState} from 'react'
import Sidebar from '../components/sidebar'
import SessionTile from '../components/SessionTile'
import { fetchFromAPI } from '../services/api'

const ListUpcoming = (props) => {
  const [renderSessions, setSessions] = useState([])

  const sampleJSON = [
    {
      "class_name": "AP Computer Science A",
      "student_name": "Anushka P",
      "session_time": "3:00 PM Tuesday",
      "session_rating": 4,
      "session_comments": "TutorTopia rules"
    },
    {
      "class_name": "Physics 101",
      "student_name": "John D",
      "session_time": "10:30 AM Wednesday",
      "session_comments": "comment1"
    },
    {
      "class_name": "Biology Lab",
      "student_name": "Samantha L",
      "session_time": "2:15 PM Monday",
      "session_comments": "comment2"
    },
    {
      "class_name": "Mathematics Advanced",
      "student_name": "David S",
      "session_time": "11:00 AM Thursday",
      "session_comments": "comment3"
    },
    {
      "class_name": "History of Art",
      "student_name": "Emily B",
      "session_time": "4:45 PM Friday",
      "session_rating": 4,
      "session_comments": "comment4"
    }
  ]

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
            sampleJSON.map((review, index) => (
              <SessionTile key={index} class_name={review.class_name}
                student_name={review.student_name}
                session_time={review.session_time}
                session_comments={review.session_comments}>
              </SessionTile>
              ))
        }
        </div>
      </div>
    </div>
  )
}

export default ListUpcoming