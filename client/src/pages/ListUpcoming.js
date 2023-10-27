import React from 'react'
import Sidebar from '../components/sidebar'
import SessionTile from '../components/SessionTile'
import { fetchFromAPI } from '../services/api'

const ListUpcoming = (props) => {
  const [renderSessions, setSessions] = useState([])

  useEffect(() => {
    fetchFromAPI(`${props.renderType}/${props.userName}`) 
      .then(data => {
        const dataArray = Object.entries(data).map(([key, value]) => ({
          key,
          firstName: value.firstName,
          lastName: value.lastName,
          middleName: value.middleName,
          password: value.password,
          userId: value.userId,
          userName: value.userName,
          courses: value.courses,
          phone: value.phone,
          email: value.email,
          major: value.major,
          hours: value.hours,
          longBio: value.longBio
        }));
      })
      .catch(error => {
        setData([]);
        console.log(error);
      });
  }, []);

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
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
        </div>
      </div>
    </div>
  )
}

export default ListUpcoming