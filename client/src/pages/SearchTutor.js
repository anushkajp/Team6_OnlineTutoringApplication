import React from "react";
import "./SearchTutor.css";

const SearchTutor = () => {
  return (
    <div>
      <div className="main-container">
        <div className="main-columns">
          <h2> First column </h2>
          <p> This is First column of our grid system</p>
        </div>
        <div className="main-columns">
          <h2> Second column </h2>
          <p> This is Second column of our grid system</p>

          <p className="find-text">Find your tutor</p>
          <div className="main-container">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="main-columns">
          <h2> Third column </h2>
          <p> This is Third column of our grid system</p>
        </div>
      </div>
    </div>
  );
};

export default SearchTutor;
