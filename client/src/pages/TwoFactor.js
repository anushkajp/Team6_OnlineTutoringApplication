import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../UserContext'

const TwoFactor = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { state } = useLocation();

  const accountType = user.accountType;
  console.log(accountType);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleValidation = () => {
    if(accountType == 'student'){
      navigate("/StudentDash");
      console.log("Validation is performed with input value:", inputValue);
    } else {
      navigate("/TutorDash");
      console.log("Validation is performed with input value:", inputValue);
    }
  };

  return (
    <div className="with-gradient">
      <div className="two-page">
        <div className="white-box">
          <p className="two-header">Two-Factor Authentication</p>
          <p className="two-txt">
            Please enter the code displayed in your authenticator app.
          </p>
          <div className="two-input-container">
            <input
              className="two-input"
              type="text"
              placeholder="6-digit code"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          <br></br>
          <br></br>

          <div className="two-input-container">
            <div className="two-button" onClick={handleValidation}>
              Validate
            </div>
          </div>

          <img className="two-logo" src={logo} />
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;

