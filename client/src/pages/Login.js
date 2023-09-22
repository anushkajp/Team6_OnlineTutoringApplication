import React from "react";
import "./Login.css";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

// no functionality yet, just UI

const Login = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  return (
    <div className="body-background">
      <div className="image-container">
        <img src={glass} />
      </div>

      {/* image container */}
      <div className="overlay-div">
        <div className="logo-container">
          <img className="logo" src={logo} />
        </div>
      </div>

      {/* login container */}
      <div className="second-overlay-div">
        <div className="login-container">
          <div className="login-box">
          <button onClick={navigateToSignUp}>sign up</button>
            <p className="header">Hello Again!</p>
            <p className="header2">Sign in to start learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
