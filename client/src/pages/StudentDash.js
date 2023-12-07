import React, { useState, useContext, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'
import FavoriteTile from '../components/FavoriteTile'
import { UserContext } from '../UserContext'
import { fetchFromAPI } from '../services/api'

const StudentDash = () => {

  const { user } = useContext(UserContext);
  const [appts, setData] = useState([]);
  const [favoriteTutorInfo, setFavoriteTutorInfo] = useState([]);
  
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
        setData([{
          datetime: "Loading...",
          length: "Loading...",
          location: "Loading...",
          online: "Loading...",
          studentId: "Loading...",
          tutorId: "Loading..."
        }]);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    
    Promise.all(
      user.favoriteTutors ? user.favoriteTutors.map((tutorUsername) =>
        fetchFromAPI(`tutor/${tutorUsername}`)
      ) : []
    )
    .then((favorTutorDataArray) =>{
      const updateFavoriteTutorInfo = user.favoriteTutors.map (
        (tutorUsername, index) => {
          const tutorProfile = favorTutorDataArray[index];
          return {
            tutorUsername,
            profilePic: tutorProfile.pfp,
            hours: tutorProfile.hours,
            coursesTaught: tutorProfile.courses
          };
        }
      );
      setFavoriteTutorInfo(updateFavoriteTutorInfo);
    })
    .catch((error) => {
      console.error('Error fetching favorite tutor profiles: ', error)
      setFavoriteTutorInfo([]);
    });
  }, [user.favoriteTutors]);

  console.log(favoriteTutorInfo);
  console.log(appts);

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
              <DashboardTile title="My Favorite Tutors">
                  {
                    favoriteTutorInfo.length > 0 ? favoriteTutorInfo.map((tutor, index) => (
                      <FavoriteTile
                        key={index} 
                        username = {tutor.tutorUsername}
                        courses = {tutor.courses}
                        profilePic = {tutor.profilePic}
                      />
                    )) : <h6>No favorite tutors yet!</h6>
                  }
              </DashboardTile>
          </div>
      </div>
    </div>
  )
}

export default StudentDash