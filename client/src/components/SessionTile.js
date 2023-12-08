import React, {useContext} from 'react';
import { UserContext } from '../UserContext'

const SessionTile = (props) => {
  const {user} = useContext(UserContext)
  return (
    <div className="session_tile">
        <div className="session_details">
          <h4 className="classNameSession"><span className="header_text">Session Time: </span>{new Date(props.datetime).toLocaleString()}</h4>

          {
            user.accountType === 'tutor' ? <h5 className="classNameSession"><span className="header_text">Student Name: </span>{props.studentId}</h5> :
            <h5 className="classNameSession"><span className="header_text">Tutor Id: </span>{props.tutorId}</h5>
          }

          <h5 className="classNameSession"><span className="header_text">Length: </span>{props.length} minutes</h5>
          <h5 className="classNameSession"><span className="header_text">Location: </span>{props.location}</h5>
          <h5 className="classNameSession"><span className="header_text">Modality: </span>{props.online ? "Online" : "In-person"}</h5>
        </div>
    </div>
  )
}

export default SessionTile;