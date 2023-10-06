import React from 'react'
import Sidebar from '../components/sidebar'
import DashboardTile from '../components/DashboardTile'

const TutorDash = () => {
  return (
    <div>
      <Sidebar renderType="tutor"></Sidebar>
      <div className="tile_contents">
          <div className="left_div">
            <div className="top_div">
                <div className="container">
                <div className="left">
                    <DashboardTile width="300px" height="300px" backgroundColor="white" title="My Tutor Stats">tutor stats here</DashboardTile>
                </div>  
                <div className="right">
                    <div className="top">
                      <DashboardTile width="140px" height="140px" backgroundColor="#B9CCF3">hours tutored</DashboardTile>
                    </div>
                    <div className='bottom'>
                      <DashboardTile width="140px" height="140px" backgroundColor="#F2B9F3">subjects taught</DashboardTile>
                    </div>
                </div>
                </div>
            </div>
            <div className="bottom_div">
              <DashboardTile title="Upcoming Sessions">list view of sessions</DashboardTile>
            </div>
          </div>
          <div className="right_div">
              <DashboardTile title="Recent Student Reviews">list view of reviews</DashboardTile>
          </div>
      </div>
    </div>
  )
}

export default TutorDash