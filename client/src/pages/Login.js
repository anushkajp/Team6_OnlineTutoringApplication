import React, { useState } from "react";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react"

// no functionality yet, just UI
// need to add functionality with firebase auth
// not completely responsive yet

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");

  // const [data, setData] = useState({
  //   email:'',
  //   password:''
  // });
  // const {email, password} =data;
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const hashPassword = () =>{
    bcrypt.hash(password,10,function(err, hash){
      console.log("Hash generated: "+hash)
      setHash(hash)
    }
    )
    // return hash
  }

  const handleSubmit = (e) =>{
    console.log(password)
    hashPassword(password)
    console.log(hash)
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

            <form className="fields-container">
              <input
                className="field"
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)

                }}
                required
              />

              <br></br>

              <input
                className="field"
                placeholder="Enter Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)

                }}
                // onInputCapture={el =>{console.log(el)}}
                required
              />

              <br></br>
              <br></br>

              <button
                className="login-button"
                type="submit"
                onClick={handleSubmit}
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
