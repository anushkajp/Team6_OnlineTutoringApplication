import React, { useState } from "react";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
      navigate("/TwoFactor");
    } catch (error) {
      console.error(error);
    }
  }

  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToTwoFactor = () => {
    navigate("/TwoFactor");
  };

  const navigateToForgot = () => {
    navigate("/Forgot");
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
                onChange={(e) => setEmail(e.target.value)}
                
                type="email"
                id="email"
                name="email"
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
