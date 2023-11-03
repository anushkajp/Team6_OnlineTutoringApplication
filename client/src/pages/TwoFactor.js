import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TwoFactor = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const verificationCode = location.state.verificationCode;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log("Input Value: ", e.target.value);
    console.log("Code: ", verificationCode);
  };

  const handleValidation = () => {
    if (inputValue == verificationCode) {
       navigate("/TutorDash");
      console.log("Validation is performed with input value:", inputValue);
      //alert("Correct Code!");
    } else {
      console.log("Verification code does not match.");
      alert("Invalid Code!");
      navigate("/Login");
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
