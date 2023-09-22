import React from "react";
import "./Login.css";
import glass from "../assets/glassmorhpism.png";

// no functionality yet, just UI

const Login = () => {
  return (
    <div className="body-background">
      <div className="image-container">
        <img src={glass} />
      </div>


      <div className="overlay-div">
        <h1>First Div</h1>
        <p>This is the first div on top of the background.</p>
      </div>
      {/* Second Div */}
      <div className="overlay-div">
        <h1>Second Div</h1>
        <p>This is the second div on top of the background.</p>
      </div>
    </div>
  );
};

export default Login;
