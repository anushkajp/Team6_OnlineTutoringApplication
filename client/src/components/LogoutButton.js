import React from 'react'
import { useNavigate, navigate } from 'react-router';
const LogoutButton = () => {
    const navigate = useNavigate();

    const buttonStyle = {
      width: '267.429px',
      height: '54.857px',
      borderRadius: '17.143px',
      border: 'none',
      background: 'var(--Bold-Purple, #fff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  };

  const textStyles = {
      color: '#a92ab7',
      fontFamily: 'Montserrat',
      fontSize: '22.286px',
      fontWeight: '500',
      lineHeight: '54.857px',
      textAlign: 'center',
  };

    const handleLogout = () => {
      navigate('/Home');
    };
  
    // return (
    //   <button className="logout" onClick={handleLogout}>Log Out</button>
    // );
    return (
      <button style={buttonStyle} onClick={handleLogout} className="logout-button">
          <span style={textStyles} className="logout-button-text">Log Out</span>
      </button>
  );
}

export default LogoutButton;