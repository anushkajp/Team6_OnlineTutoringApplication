import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'
import FavoriteTile from '../components/FavoriteTile'
import { UserContext } from '../UserContext'
import { fetchFromAPI } from '../services/api'

const favoriteTutorInfo = []
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
      .then((favorTutorDataArray) => {
        const updateFavoriteTutorInfo = user.favoriteTutors.map(
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
  }, []);

  return (
    <Layout>
      <div className="leftContent">
        <div className="statsTiles">
          <DashboardTile margin="1rem" border="2rem" width="30vh" height="20vh" backgroundColor="#B9CCF3" cln="hoursTutored">
            <h1>{user.hours}</h1>
            <h6>hours tutored</h6>
          </DashboardTile>
          <DashboardTile margin="1rem" border="2rem" width="30vh" height="20vh" backgroundColor="#F9C8C8" cln="hoursTutored">
            <h1>{appts.length}</h1>
            <h6>sessions booked</h6>
          </DashboardTile>
        </div>

        <DashboardTile title="Upcoming Sessions" margin="0rem" border="0rem" width="72vh" height="60vh" cln="upcomingSessions">
          {
            appts.length > 0 ? appts.map((session, index) => (
              <SessionTile
                datetime={session.datetime}
                length={session.length}
                location={session.location}
                online={session.online}
                studentId={session.studentId}
                tutorId={session.tutorId}
              ></SessionTile>)) : <h6>No upcoming sessions yet!</h6>
          }
        </DashboardTile>
      </div>

      <div className="rightContent">
        <DashboardTile height="84vh" title="My Favorite Tutors" cln="favorite_tutors">
        {
            favoriteTutorInfo.map((tutor, index) => (
              <FavoriteTile
                key={index}
                username={tutor.username}
                courses={tutor.courses}
                hours={tutor.hours}
                profilePic={tutor.profilePic}
              />
            ))
          }
        </DashboardTile>
      </div>
    </Layout>
  )
}

export default StudentDash