import React, { useState } from "react";
import glass from "../assets/glassmorhpism.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react"
import { uploadToAPI, fetchFromAPI } from '../services/api'
import Cookies from 'js-cookie'
import CreateFields from "../components/CreateFields";
import User from "../models/user"
// no functionality yet, just UI
// need to add functionality with firebase auth
// not completely re sponsive yet

const Login = () => {
  Cookies.set()
  const labelData = {
    username:{"label":"Username"},
    password:{"label":"Password"}
  }
  const [hash, setHash] = useState("");
  const initialUser = new User();
  const [user , setUser] = useState(initialUser)

  // const [data, setData] = useState({
  //   email:'',
  //   password:''
  // });
  // const {email, password} =data;
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const hashPassword = async(password) =>{
    const gennedHash = await new Promise((resolve, reject)=> {
      bcrypt.hash(password,10,function(error, hash){
        if(error){
          reject(error)
        }else{
          resolve(hash)
        }

        
      })
    })
    // console.log("Hash generated: "+gennedHash)
    
    return gennedHash
    // return hash
  }

  // const comparePassword = async()=>{
  //   console.log(await bcrypt.compare(password,hash))
  // }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("Form data submitted:", user);
    (async ()=>{
      try{
      const pwdHash = await hashPassword(user.password)
      user.password=  pwdHash
      const data = await uploadToAPI("login/",user)
      console.log(data)
      }catch(e){
        console.log(e)
      }
      
    })()

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
              {CreateFields(user, setUser, labelData)}

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
  )
}

export default Login