import React from 'react'
import Sidebar from '../components/sidebar'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'
import LogoutButton from '../components/LogoutButton'

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const StudentDash = (props) => {
  // const isStudentLogin = props.isStudent;
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  }

  const favoriteTutors = [
    "Diana Le",
    "Anushka Pimple",
    "Ryan Lahlou",
    "Tommy Cheung"
  ]

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

  // console.log(isStudentLogin)

  return (
    <div className="dashboardPage">
      <Sidebar className="dbPageSidebar" renderType="student"></Sidebar>
      <div className="tile_contents">
          <div className="left_div">
            <div className="top_div">
                <div className="container">
                <div className="left">
                    <DashboardTile width="300px" height="300px" backgroundColor="white" title="My Student Stats">
                        
                    </DashboardTile>
                </div>  
                <div className="right">
                    <div className="top">
                      <DashboardTile width="140px" height="140px" backgroundColor="#B9CCF3">
                        <h1>15</h1>
                        <h6>hours tutored</h6>
                      </DashboardTile>
                    </div>
                    <div className='bottom'>
                      <DashboardTile width="140px" height="140px" backgroundColor="#F2B9F3">
                        <h1>15</h1>
                        <h6>subjects learned</h6>
                      </DashboardTile>
                    </div>
                </div>
                </div>
            </div>
            <div className="bottom_div">
              <DashboardTile cln="sessiontiles" title="Upcoming Sessions">
                  {
                    sampleJSON.slice(0,4).map((review, index) => (
                      <SessionTile key={index} class_name={review.class_name}
                      student_name={review.student_name}
                      session_time={review.session_time}
                      session_comments={review.session_comments}>
                      </SessionTile>
                    ))
                  }
              </DashboardTile>
            </div>
          </div>
          <div className="right_div">
              <DashboardTile title="My favorite tutors">
                  <div className="favorites">
                    {
                      favoriteTutors.map((review, index) => (
                        <div className="tutortile" key={index} >
                            <h3 className="reviewTutor">{review}</h3>
                        </div>
                      ))
                    }
                  </div>
              </DashboardTile>
              <LogoutButton onClick={handleLogout} />
          </div>
      </div>
    </div>
  )
}

export default StudentDash