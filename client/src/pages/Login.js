import React, { useState } from "react";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

// no functionality yet, just UI
// need to add functionality with firebase auth
// not completely responsive yet

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToForgot = () => {
    navigate("/Forgot");
  };

  const navigateToTwoFactor = () => {
    const code = generateVerificationCode(); 
  navigate("/TwoFactor", { state: { verificationCode: code } });
  sendVerificationEmail(code); 
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendVerificationEmail = (code) => {
    const serviceId = "service_dz0xhzf";
    const templateId = "template_xs9buif";
    const userId = "cWti8bd46sTP6-Sgr";

    const templateParams = {
      verification_code: code,
      email: email,
    };

    emailjs
      .send(
        serviceId,
        templateId,
        templateParams,
        userId
      )
      .then(
        (response) => {
          console.log("Email sent:", response);
          navigate("/TutorDash");
        },
        (error) => {
          console.error("Email could not be sent:", error);
        }
      );
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
            <p className="header">Hello Again!</p>
            <p className="header2">Sign in to start learning</p>

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
            <br></br>

            <a className="sign-up" onClick={navigateToForgot}>
              forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
