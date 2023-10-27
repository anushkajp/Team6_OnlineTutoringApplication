import React from 'react'
import { useNavigate, navigate } from 'react-router';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/Home');
    };
  
    return (
      <button className="logout" onClick={handleLogout}>Log Out</button>
    );
}

export default LogoutButton;