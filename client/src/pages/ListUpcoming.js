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
              data.length > 0 ? data.map((session, index) => (
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