import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'
import FavoriteTile from '../components/FavoriteTile'
import { UserContext } from '../UserContext'
import { useState, useEffect, useContext } from 'react'
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
      "datetime": "2015-09-26T13:00:00",
      "length": 60,
      "location": "www.zoom.com",
      "online": true,
      "studentId": "lryanlesgf",
      "tutorId": "bib123"
    },
    {
      "datetime": "2015-09-26T13:00:00",
      "length": 60,
      "location": "www.zoom.com",
      "online": true,
      "studentId": "lryanlesgf",
      "tutorId": "bib123"
    }, {
      "datetime": "2015-09-26T13:00:00",
      "length": 60,
      "location": "www.zoom.com",
      "online": true,
      "studentId": "lryanlesgf",
      "tutorId": "bib123"
    },
    {
      "datetime": "2015-09-26T13:00:00",
      "length": 60,
      "location": "www.zoom.com",
      "online": true,
      "studentId": "lryanlesgf",
      "tutorId": "bib123"
    },
    {
      "datetime": "2015-09-26T13:00:00",
      "length": 60,
      "location": "www.zoom.com",
      "online": true,
      "studentId": "lryanlesgf",
      "tutorId": "bib123"
    }, {
      "datetime": "2015-09-26T13:00:00",
      "length": 60,
      "location": "www.zoom.com",
      "online": true,
      "studentId": "lryanlesgf",
      "tutorId": "bib123"
    }
  ]

  const favorite_tutors = [
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
    {
      username: "tommycheung",
      courses: ["agile development", "computer science"],
      hours: 10
    },
  ]


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
                  <SessionTile></SessionTile>
                  <SessionTile></SessionTile>
                  <SessionTile></SessionTile>
                  <SessionTile></SessionTile>
              </DashboardTile>
            </div>
          </div>
          <div className="right_div">
              <DashboardTile title="My Favorite Tutors">
                  {
                    favoriteTutorInfo.map((tutor, index) => (
                      <FavoriteTile
                        key={index} 
                        username = {tutor.tutorUsername}
                        courses = {tutor.courses}
                        profilePic = {tutor.profilePic}
                      />
                    ))
                  }
              </DashboardTile>
          </div>
      </div>
    </Layout>
  )
}

export default StudentDash