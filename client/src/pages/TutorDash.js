import React from 'react'
import Sidebar from '../components/sidebar'
import DashboardTile from '../components/DashboardTile'
import SessionTile from '../components/SessionTile'

const TutorDash = () => {
  return (
    <div className="dashboardPage">
      <Sidebar className="dbPageSidebar" renderType="tutor"></Sidebar>
      <div className="tile_contents">
          <div className="left_div">
            <div className="top_div">
                <div className="container">
                <div className="left">
                    <DashboardTile width="300px" height="300px" backgroundColor="white" title="My Tutor Stats">
                        
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
              <DashboardTile title="Recent Student Reviews">Loading...</DashboardTile>
          </div>
      </div>
    </div>
  )
}

export default TutorDash