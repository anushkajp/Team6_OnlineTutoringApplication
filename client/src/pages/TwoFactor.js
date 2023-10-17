import React from "react";
import "./TwoFactor.css";
import logo from "../assets/logo.png";

const TwoFactor = () => {
  document.body.style.background =
    "linear-gradient(180deg, #B9CCF3 0%, #F2B9F3 100%)";

  return (
    <div className="two-page">
      <div className="white-box">
        <p className="two-header">Two-Factor Authentication</p>
        <p className="two-txt">
          Please enter the code displayed in your authenticator app.
        </p>
        <div className="two-input-container">
          <div className="two-input">6-digit code</div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
