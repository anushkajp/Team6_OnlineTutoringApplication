import React from "react";
import logo from "../assets/TT_Logo_Design.png";
import laptop from "../assets/laptop.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToSignUpStudent = () => {
    navigate("/SignUpStudent");
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
            <p onClick={navigateToContact}>Contact</p>
          </a>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-container-bottom">
          <img className="img-laptop" src={laptop}></img>
        </div>
        <div class="flex-container-bottom">
          <p class="header-text-home">
            Private Tutoring, with the click of a button.
          </p>
          <p class="header-text-des">
            TutorTopia instantly connects you with verified tutors in your area.
            Get tutoring with the click of a button. Tutor at your most
            convenient times, plan your sessions!
          </p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div class="button-nav1">
            <p class="text1" onClick={navigateToSignUp}> Sign up - Tutor</p>
          </div>
          <br></br>
          <br></br>
          <div class="button-nav2">
            <p class="text2" onClick={navigateToSignUpStudent}> Sign up - Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
