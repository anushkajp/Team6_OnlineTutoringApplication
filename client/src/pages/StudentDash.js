import React from 'react'
import Sidebar from '../components/sidebar'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'

const StudentDash = () => {
  return (
    <div className="dashboardPage">
      <Sidebar className="dbPageSidebar" renderType="student"></Sidebar>
      <div className="tile_contents">
          <div className="left_div">
            <div className="top_div">
                <div className="container">
                <div className="left">
                    <DashboardTile width="300px" height="300px" backgroundColor="white" title="My Student Stats">
                        
                    </DashboardTile>
                </div>  
                <div className="right">
                    <div className="top">
                      <DashboardTile width="140px" height="140px" backgroundColor="#B9CCF3">
                        <h1>15</h1>
                        <h6>hours tutored</h6>
                      </DashboardTile>
                    </div>
                    <div className='bottom'>
                      <DashboardTile width="140px" height="140px" backgroundColor="#F2B9F3">
                        <h1>15</h1>
                        <h6>subjects learned</h6>
                      </DashboardTile>
                    </div>
                </div>
                </div>
            </div>
            <div className="bottom_div">
              <DashboardTile cln="sessiontiles" title="Upcoming Sessions">
                  <SessionTile></SessionTile>
                  <SessionTile></SessionTile>
                  <SessionTile></SessionTile>
                  <SessionTile></SessionTile>
              </DashboardTile>
            </div>
          </div>
          <div className="right_div">
              <DashboardTile title="My Favorite Tutors">
                  {
                    favoriteTutorInfo.map((tutor, index) => (
                      <FavoriteTile
                        key={index} 
                        username = {tutor.tutorUsername}
                        courses = {tutor.courses}
                        profilePic = {tutor.profilePic}
                      />
                    ))
                  }
              </DashboardTile>
          </div>
      </div>
    </div>
  )
}

export default StudentDash