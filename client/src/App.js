import "./App.css";
import React, { useContext } from "react";
import { UserProvider, UserContext } from "./UserContext"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <UserProvider>
        {
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUpStudent" element={<SignUpStudent />} />
              <Route path="/SignUpTutor" element={<SignUpTutor />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Forgot" element={<Forgot />} />
              <Route path="/Home" element={<Home />} />

              <Route
                path="/AddTutorSession"
                element={user ? <AddTutorSession /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/CalendarPage"
                element={user ? <CalendarPage /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/ListUpcoming"
                element={user ? <ListUpcoming/> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/ProfileSettings"
                element={user ? <ProfileSettings/> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/Reviews"
                element={user ? <Reviews /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/SearchTutor"
                element={user ? <SearchTutor /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/StudentDash"
                element={user ? <StudentDash /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/TutorDash"
                element={user ? <TutorDash /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/TutorReports"
                element={user ? <TutorReports /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/TwoFactor"
                element={user ? <TwoFactor /> : <Navigate to="/Login" replace />}
              />
            </Routes>
          </BrowserRouter>
        }
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <UserProvider>
        {
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUpStudent" element={<SignUpStudent />} />
              <Route path="/SignUpTutor" element={<SignUpTutor />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Forgot" element={<Forgot />} />
              <Route path="/Home" element={<Home />} />

              <Route
                path="/AddTutorSession"
                element={user ? <AddTutorSession /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/CalendarPage"
                element={user ? <CalendarPage /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/ListUpcoming"
                element={user ? <ListUpcoming/> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/ProfileSettings"
                element={user ? <ProfileSettings/> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/Reviews"
                element={user ? <Reviews /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/SearchTutor"
                element={user ? <SearchTutor /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/StudentDash"
                element={user ? <StudentDash /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/TutorDash"
                element={user ? <TutorDash /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/TutorReports"
                element={user ? <TutorReports /> : <Navigate to="/Login" replace />}
              />
              <Route
                path="/TwoFactor"
                element={user ? <TwoFactor /> : <Navigate to="/Login" replace />}
              />
            </Routes>
          </BrowserRouter>
        }
      </UserProvider>
    </div>
  );
}

export default App;
