import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from "./UserContext"

// import styles
import "./styles/global.css";
import "./styles/signup.css";
import "./styles/sidebar.css";
import "./styles/upcoming.css";
import "./styles/profile.css";
import "./styles/dashboard_tile.css";
import "./styles/session_tile.css";
import "./styles/dashboard.css";
import "./styles/SearchTutor.css";
import "./styles/TutorModal.css";
import "./styles/TwoFactor.css";
import "./styles/Login.css";
import "./styles/reviewtile.css";
import "./styles/tutor_reports.css";
import "./styles/Calendar.css";
import "./styles/Home.css";
import "./styles/AddTutorSession.css"
import "./styles/Reviews.css"


// import pages
import AddTutorSession from "./pages/AddTutorSession";
import CalendarPage from "./pages/CalendarPage";
import Contact from "./pages/Contact";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import ListUpcoming from "./pages/ListUpcoming";
import Login from "./pages/Login";
import ProfileSettings from "./pages/ProfileSettings";
import Reviews from "./pages/Reviews";
import SearchTutor from "./pages/SearchTutor";
import SignUpStudent from "./pages/SignUpStudent";
import SignUpTutor from "./pages/SignUpTutor";
import StudentDash from "./pages/StudentDash";
import TutorDash from "./pages/TutorDash";
import TutorReports from "./pages/TutorReports";
import TwoFactor from "./pages/TwoFactor";
import { User } from "./comp_models/user";

function App() {
  return (  
      /* <nav>
        <ul>
          <li><a href="/AddTutorSession">AddTutorSession</a></li>
          <li><a href="/CalendarPage">CalendarPage</a></li>
          <li><a href="/Contact">Contact</a></li>
          <li><a href="/Forgot">Forgot</a></li>
          <li><a href="/Home">Home</a></li>
          <li><a href="/ListUpcoming">ListUpcoming</a></li>
          <li><a href="/Login">Login</a></li>
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
      </nav> */

      <UserProvider>
        {
        <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/AddTutorSession" element={<AddTutorSession />} />
        <Route path="/CalendarPage" element={<CalendarPage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ListUpcoming" element={<ListUpcoming renderType="student" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ProfileSettings" element={<ProfileSettings renderType="student" userName="deedee"/>} /> 
        <Route path="/Reviews" element={<Reviews />} />
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
    }
    </UserProvider>
    
  );
}

export default App;
