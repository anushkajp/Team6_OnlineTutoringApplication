import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import bcrypt from "bcryptjs-react"
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword,setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth, fetchUserType, findStudentByKey } from '../firebase';
import { UserContext } from "../UserContext";

import emailjs from "emailjs-com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  let navigate = useNavigate();
  // additions from addTutorSession
  const hashPassword = async (password) => {
    const gennedHash = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (error, hash) {
        if (error) {
          reject(error)
        } else {
          resolve(hash)
        }

      })
    })
    // console.log("Hash generated: "+gennedHash)

    return gennedHash
    // return hash
  }
  // additions from addTutorSession
  // handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // additions from add tutor session
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const accountInfo = await fetchUserType(user.email);
      const data = await findStudentByKey(accountInfo.userKey);
  
      updateUser({ 
        uid: user.uid, 
        email: user.email, 
        accountType: accountInfo.accountType, 
        key: accountInfo.userKey, 
        ...data 
      });
  // additions from add tutor session
      navigateToTwoFactor();
    
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error in state to display error message to user
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
    navigate("/TwoFactor", { state: { verificationCode: code}});
    sendVerificationEmail(code, email);
  };
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const sendVerificationEmail = (code, email) => {
    const serviceId = "service_dz0xhzf";
    const templateId = "template_xs9buif";
    const userId = "cWti8bd46sTP6-Sgr";
    const templateParams = {
      verification_code: code,
      to_email: email,
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
            <div className="back-button-container">
              <div className="back-button" onClick={() => {navigate(-1)}}>
                <ArrowLeft size={20} color={`var(--background-color)`} strokeWidth={2} />Back
              </div>
            </div>
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
              <button
                className="login-button"
                type="submit"
                onSubmit={navigateToTwoFactor}
              >
                Log in
              </button>
            </form>
            <span>
              <a className="sign-up" onClick={navigateToForgot}>
                forgot password?
              </a>
              {" | "}
              <a className="sign-up" onClick={navigateToSignUp}>
                sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;