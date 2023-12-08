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
  }, [user.favoriteTutors]);

  const sampleAppts = [
    {
      datetime: "2023-12-05T10:00:00",
      length: 60,
      location: "www.zoom.com",
      online: true,
      studentId: "student001",
      tutorId: "tutorA"
    },
    {
      datetime: "2023-12-06T11:30:00",
      length: 60,
      location: "www.skype.com",
      online: true,
      studentId: "student002",
      tutorId: "tutorB"
    },
    {
      datetime: "2023-12-07T09:15:00",
      length: 60,
      location: "www.googlemeet.com",
      online: true,
      studentId: "student003",
      tutorId: "tutorC"
    },
    {
      datetime: "2023-12-08T14:00:00",
      length: 60,
      location: "www.zoom.com",
      online: true,
      studentId: "student004",
      tutorId: "tutorD"
    },
    {
      datetime: "2023-12-09T16:45:00",
      length: 60,
      location: "www.teams.com",
      online: true,
      studentId: "student005",
      tutorId: "tutorE"
    }
  ];
  
  const favorite_tutors = [
    {
      username: "TommyCheung",
      courses: ["Software Engineering", "Discrete Math 1"],
      hours: 10
    },
    {
      username: "JessicaWong",
      courses: ["Software Architecture"],
      hours: 15
    },
    {
      username: "MohamedAli",
      courses: ["Automata Theory", "Computer Graphics"],
      hours: 12
    },
    {
      username: "SarahJohnson",
      courses: ["Discrete Math 1"],
      hours: 8
    },
    {
      username: "AnitaPatel",
      courses: ["Software Engineering"],
      hours: 20
    }
  ];  

  return (
    <Layout>
      <div className="leftContent">
        <div className="statsTiles">
          <DashboardTile margin="1rem" border="2rem" width="30vh" height="20vh" backgroundColor="#B9CCF3" cln="hoursTutored">
            <h1>{user.hours}</h1>
            <h6>hours tutored</h6>
          </DashboardTile>
          <DashboardTile margin="1rem" border="2rem" width="30vh" height="20vh" backgroundColor="#F9C8C8" cln="hoursTutored">
            <h1>{sampleAppts.length}</h1>
            <h6>sessions booked</h6>
          </DashboardTile>
        </div>

        <DashboardTile title="Upcoming Sessions" margin="0rem" border="0rem" width="72vh" height="60vh" cln="upcomingSessions">
          {
            sampleAppts.length > 0 ? sampleAppts.map((session, index) => (
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
            favorite_tutors.map((tutor, index) => (
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