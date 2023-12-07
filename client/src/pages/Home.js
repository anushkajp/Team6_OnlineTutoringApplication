import React from "react";
import logo from "../assets/TT_Logo_Design.png";
import laptop from "../assets/laptop.png";
import { useNavigate } from "react-router-dom";
import { LibraryBig, GraduationCap } from "lucide-react";

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
          <a onClick={navigateToLogin}>
            Log in
          </a>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-container-left">
          <img className="img-laptop" src={laptop}></img>
        </div>
        <div className="flex-container-right">
          <p className="header-text-home">
            Private Tutoring, with the click of a button.
          </p>
          <p className="header-text-des">
            TutorTopia instantly connects you with verified tutors in your area.
            Get tutoring with the click of a button. Tutor at your most
            convenient times, plan your sessions!
          </p>
          <div className="home-button-container">
            <div className="button-nav2" onClick={navigateToSignUpStudent}>
              <LibraryBig size={20} color={`var(--background-color)`} strokeWidth={2} />Student Sign up
            </div>
            <div className="button-nav1" onClick={navigateToSignUp}>
              <GraduationCap size={20} color={`var(--background-color)`} strokeWidth={2} />Tutor Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
