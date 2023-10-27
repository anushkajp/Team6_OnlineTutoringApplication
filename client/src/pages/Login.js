import React, { useState } from "react";
import "./Login.css";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// no functionality yet, just UI
// need to add functionality with firebase auth
// not completely responsive yet

//needs to be changed to fit Auth0
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToTwoFactor = () => {
    navigate("/TwoFactor");
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to send username and password
      const response = await axios.post("http://localhost:8000/student/login", {
        username: email,
        password: password,
      });

      // Check the response status
      if (response.status === 200) {
        // Redirect to the TwoFactor page on success
        navigateToTwoFactor();
      } else {
        // Handle other response codes as needed
        setError("Invalid username or password.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setError("An error occurred while logging in.");
    }
  };

  const handleLoginButtonClick = (e) => {
    e.preventDefault(); // Prevent the form from being submitted
    handleLogin(); // Call the handleLogin function
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
              <a className="sign-up" onClick={navigateToTwoFactor}>
                Sign up today!
              </a>
            </p>
            <p className="header">Hello Again!</p>
            <p className="header2">Sign in to start learning</p>

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

              <input
                className="field"
                placeholder="Enter Password"
                type="password"
                id="password"
                name="password"
                required
              />

              <br></br>
              <br></br>

              <button
                className="login-button"
                type="submit"
                onClick={navigateToTwoFactor}
              >
                <p className="login-button-text">Log in</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
