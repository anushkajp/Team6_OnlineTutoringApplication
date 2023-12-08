import React, {useContext} from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../UserContext'

const LogoutButton = () => {
   const { logoutUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
      logoutUser(() => navigate("/Home")); 
    };
  
    return (
      <button onClick={handleLogout}>
            Log Out
      </button>
    );
}

export default LogoutButton;