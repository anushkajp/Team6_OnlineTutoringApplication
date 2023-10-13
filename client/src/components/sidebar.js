import { render } from '@testing-library/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = (props) => {
  const renderType = props.renderType
  const location = useLocation();
  
  const isNavItemSelected = (path) => {
    return location.pathname === path;
  };

  if(renderType == "student"){
      return (
        <div className="navbar">
          <nav>
            <ul>
              <li className={isNavItemSelected('/StudentDash') ? 'selected-nav-item' : ''}><a href="/StudentDash">Home</a></li>
              <li className={isNavItemSelected('/SearchTutor') ? 'selected-nav-item' : ''}><a href="/SearchTutor">Search Sessions</a></li>
              <li className={isNavItemSelected('/ListUpcoming') ? 'selected-nav-item' : ''}><a href="/ListUpcoming">Upcoming Sessions</a></li>
              <li className={isNavItemSelected('/SavedCoursesStudent') ? 'selected-nav-item' : ''}><a href="/SavedCoursesStudent">My Saved Courses</a></li>
              <li className={isNavItemSelected('/ProfileSettings') ? 'selected-nav-item' : ''}><a href="/ProfileSettings">Profile Settings</a></li>
            </ul>
          </nav>

      </div>
      )
  } else {
    return (
      <div className="navbar">
          <nav>
            <ul>
              <li className={isNavItemSelected('/TutorDash') ? 'selected-nav-item' : ''}><a href="/TutorDash">Tutor Dashboard</a></li>
              <li className={isNavItemSelected('/AddTutorSession') ? 'selected-nav-item' : ''}><a href="/AddTutorSession">Add New Session</a></li>
              <li className={isNavItemSelected('/ListUpcoming') ? 'selected-nav-item' : ''}><a href="/ListUpcoming">Upcoming Sessions</a></li>
              <li className={isNavItemSelected('/TutorReports') ? 'selected-nav-item' : ''}><a href="/TutorReports">My Reports</a></li>
              <li className={isNavItemSelected('/ProfileSettings') ? 'selected-nav-item' : ''}><a href="/ProfileSettings">ProfileSettings</a></li>
            </ul>
          </nav>

      </div>
    )
}}

export default Sidebar;