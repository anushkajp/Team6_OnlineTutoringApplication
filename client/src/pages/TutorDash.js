import React, { useState, useContext, useEffect } from 'react'
import React, { useState, useContext, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'
import ReviewTile from '../components/ReviewTile'
import { UserContext } from '../UserContext'
import { fetchFromAPI } from '../services/api'

const TutorDash = () => {

  const { user } = useContext(UserContext);
  const [appts, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetchFromAPI(`appointments/${user.accountType}/${user.username}`) 
      .then(data => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          datetime: value.datetime,
          length: value.length,
          location: value.location,
          online: value.online,
          studentId: value.studentId,
          tutorId: value.tutorId
        }
        ));
        setData(render_data)
      })
      .catch(error => {
        setData({
          datetime: "Loading...",
          length: "Loading...",
          location: "Loading...",
          online: "Loading...",
          studentId: "Loading...",
          tutorId: "Loading..."
        });
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchFromAPI(`review/${user.username}`) 
      .then(data => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          tutorUsername: value.tutorUsername,
          studentUsername: value.studentUsername,
          rating: parseFloat(value.rating), // Parse rating as a float
          description: value.description      
        }
        ));
        console.log(render_data)
        setReviews(render_data); 
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setReviews([])
      });
    }, []);

  return (
    <div className="dashboardPage">
      <Sidebar className="dbPageSidebar" renderType="tutor"></Sidebar>
      <div className="tile_contents">
          <div className="left_div">
            <div className="top_div">
                <div className="container"> 
                <div className="top">
                    <div className="left">
                      <DashboardTile width="35vh" height="35vh" backgroundColor="#B9CCF3">
                        <h1>{user.hours}</h1>
                        <h6>hours tutored</h6>
                      </DashboardTile>
                    </div>
                </div>
                </div>
            </div>
            <div className="bottom_div">
              <DashboardTile width="70vh" className="sessiontiles" title="Upcoming Sessions">
                  {
                    appts.length > 0 ? appts.map((session, index) => (
                      <SessionTile 
                        datetime={session.session_time}
                        length={session.session_length}  
                        location={session.session_location}  
                        online={session.session_online}  
                        studentId={session.student_name}
                        tutorId={session.session_rating}
                      ></SessionTile>)) : <h6>No upcoming sessions yet!</h6>
                  }
              </DashboardTile>
            </div>
          </div>
          <div className="right_div">
              <DashboardTile title="Recent Student Reviews">
                  {
                    reviews.map((review, index) => (
                      <ReviewTile
                        key={index} 
                        tutorId = {review.tutorUsername}
                        studentId = {review.studentUsername}
                        rating = {review.rating}
                        description = {review.description}
                      />
                    ))
                  }
              </DashboardTile>
          </div>
      </div>
    </div>
  )
}

export default TutorDash