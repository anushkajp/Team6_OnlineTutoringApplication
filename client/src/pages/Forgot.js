import React, { useState } from "react";
import "./Login.css";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

// no functionality yet, just UI
// need to add functionality with firebase auth
// not completely responsive yet

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const handleButtonClick = () => {
    alert("Email Sent!");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const handleButtonClick = () => {
    alert("Email Sent!");
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
            <p className="dont-acc">
              Don't have an account?&#160;
              <a className="sign-up" onClick={navigateToSignUp}>
                Sign up today!
              </a>
            </p>
            <p className="header-forgot">Forgot Password?</p>
            <p className="header2-forgot">
              Enter your email below to receive password reset instructions.
            </p>

            <br></br>
            <br></br>

            <form className="fields-container">
              <input
                className="field"
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
                required
              />

              <br></br>
              <br></br>

              <button
                className="login-button"
                type="submit"
                onClick={handleButtonClick}
              >
                <p className="login-button-text">Submit</p>
              </button>
            </form>

            <br></br>
            <br></br>
              <a className="sign-up" onClick={navigateToLogin}>
                  return to login?
                </a>
          </div>
        </div>
      </div>
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
            <p className="dont-acc">
              Don't have an account?&#160;
              <a className="sign-up" onClick={navigateToSignUp}>
                Sign up today!
              </a>
            </p>
            <p className="header-forgot">Forgot Password?</p>
            <p className="header2-forgot">
              Enter your email below to receive password reset instructions.
            </p>

            <br></br>
            <br></br>

            <form className="fields-container">
              <input
                className="field"
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
                required
              />

              <br></br>
              <br></br>

              <button
                className="login-button"
                type="submit"
                onClick={handleButtonClick}
              >
                <p className="login-button-text">Submit</p>
              </button>
            </form>

            <br></br>
            <br></br>
              <a className="sign-up" onClick={navigateToLogin}>
                  return to login?
                </a>
          </div>
        </div>
      </div>
    </div>
  );
};
  );
};

export default Forgot;

export default Forgot;
