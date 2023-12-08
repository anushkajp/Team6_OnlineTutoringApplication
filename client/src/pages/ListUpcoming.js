import React, {useContext, useState, useEffect} from 'react'
import Sidebar from '../components/sidebar'
import SessionTile from '../components/SessionTile'
import { UserContext } from '../UserContext'
import { fetchFromAPI } from '../services/api'
import Layout from '../components/Layout'

const ListUpcoming = (props) => {
  const { user } = useContext(UserContext);
  const [ data, setData] = useState([])

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
        console.log(render_data);
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

  return (
    <Layout>
        <div className="upcomingPage">
      <div className="upcomingSession">
        <div className="switchView">
          <nav>
            <a href="/ListUpcoming">List View | </a>
            <a href="/CalendarPage">Calendar View</a>
          </nav>
        </div>
        <div className="upcomingSessionList">
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
        </div>
      </div>
    </div>
    </Layout>
  )
}
export default ListUpcoming