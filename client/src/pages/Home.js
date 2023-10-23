import React from "react";
import logo from "../assets/TT_Logo_Design.png";
import laptop from "../assets/laptop.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const navigateToContact = () => {
    navigate("/Contact");
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

  const pageStyle = {
    background: "#F1EFEF",
  };

  return (
    <div style={pageStyle}>
      <div className="flex-container">
        <img className="logo-top" src={logo} onClick={navigateToHome} />
        <div className="link-row">
          <a href="#">
            <p onClick={navigateToLogin}>Log in</p>
          </a>
          <a href="#">
            <p onClick={navigateToSignUp}>Sign up</p>
          </a>
          <a href="#">
            <p onClick={navigateToContact}>Contact</p>
          </a>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-container-bottom">

          <img className = "img-laptop" src= {laptop}></img>
        
        </div>
        <div class="flex-container-bottom">Container 2</div>
      </div>
    </div>
  );
};

export default Home;
