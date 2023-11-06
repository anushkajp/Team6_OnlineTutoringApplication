import React, { useState } from "react";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

// import 'dotenv/config'
import emailjs from "emailjs-com";

// no functionality yet, just UI
// need to add functionality with firebase auth
// not completely responsive yet

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      alert("Navigating to two factor.....");
      navigateToTwoFactor();
    } catch (error) {
      alert("Incorrect password entered!");
      console.error(error);
    }
    }

  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
    
  };

  const navigateToForgot = () => {
    navigate("/Forgot");
  };

  const navigateToTwoFactor = () => {
    const code = generateVerificationCode();
    navigate("/TwoFactor", { state: { verificationCode: code } });
    sendVerificationEmail(code, email);
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendVerificationEmail = (code, email) => {
    const serviceId = "service_ia60n69";
    const templateId = "template_d2sya2n";
    const userId = "BSLbkagTdMxLeJe1L";

    const templateParams = {
      verification_code: code,
      to_email: email,
    };

    console.log("email: ", email);

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

            <form onSubmit= {handleSubmit} className="fields-container">
              <input
                className="field"
                placeholder="Enter email"
                required
                value={email}
                type="email"
                id="email"
                name="email"
                onChange={handleEmailChange}
              />

              <br></br>

              <input
                className="field"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                type="password"
                id="password"
                name="password"
               
              />

              <br></br>
              <br></br>

              <button
                className="login-button"
                type="submit"
                onSubmit={navigateToTwoFactor}
              >
                <p type = "submit" className="login-button-text">Log in</p>
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
