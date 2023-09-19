import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import pages
import AddTutorSession from "./pages/AddTutorSession";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import ListUpcoming from "./pages/ListUpcoming";
import LoginStudent from "./pages/LoginStudent";
import LoginTutor from "./pages/LoginTutor";
import ProfileSettings from "./pages/ProfileSettings";
import SavedCoursesStudent from "./pages/SavedCoursesStudent";
import SearchTutor from "./pages/SearchTutor";
import SignUpStudent from "./pages/SignUpStudent";
import SignUpTutor from "./pages/SignUpTutor";
import StudentDash from "./pages/StudentDash";
import TutorDash from "./pages/TutorDash";
import TutorReports from "./pages/TutorReports";
import TwoFactor from "./pages/TwoFactor";

function App() {
  return (
    <div className="App">
      
      <nav>
        <ul>
          <li><a href="/AddTutorSession">AddTutorSession</a></li>
          <li><a href="/Calendar">Calendar</a></li>
          <li><a href="/Contact">Contact</a></li>
          <li><a href="/Forgot">Forgot</a></li>
          <li><a href="/Home">Home</a></li>
          <li><a href="/ListUpcoming">ListUpcoming</a></li>
          <li><a href="/LoginStudent">LoginStudent</a></li>
          <li><a href="/LoginTutor">LoginTutor</a></li>
          <li><a href="/ProfileSettings">ProfileSettings</a></li>
          <li><a href="/SavedCoursesStudent">SavedCoursesStudent</a></li>
          <li><a href="/SearchTutor">SearchTutor</a></li>
          <li><a href="/SignUpStudent">SignUpStudent</a></li>
          <li><a href="/SignUpTutor">SignUpTutor</a></li>
          <li><a href="/StudentDash">StudentDash</a></li>
          <li><a href="/TutorDash">TutorDash</a></li>
          <li><a href="/TutorReports">TutorReports</a></li>
          <li><a href="/TwoFactor">TwoFactor</a></li>
        </ul>
      </nav>


      <BrowserRouter>
      <Routes>
        <Route path="/AddTutorSession" element={<AddTutorSession />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ListUpcoming" element={<ListUpcoming />} />
        <Route path="/LoginStudent" element={<LoginStudent />} />
        <Route path="/LoginTutor" element={<LoginTutor />} />
        <Route path="/ProfileSettings" element={<ProfileSettings />} />
        <Route path="/SavedCoursesStudent" element={<SavedCoursesStudent />} />
        <Route path="/SearchTutor" element={<SearchTutor />} />
        <Route path="/SignUpStudent" element={<SignUpStudent />} />
        <Route path="/SignUpTutor" element={<SignUpTutor />} />
        <Route path="/StudentDash" element={<StudentDash />} />
        <Route path="/TutorDash" element={<TutorDash />} />
        <Route path="/TutorReports" element={<TutorReports />} />
        <Route path="/TwoFactor" element={<TwoFactor />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
