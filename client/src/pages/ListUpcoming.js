import React from 'react'

const ListUpcoming = () => {
  return (
    <div className="upcomingPage">
      <div className="sidebar">
        <Sidebar renderType={props.renderType}></Sidebar>
      </div>
      <div className="upcomingSession">
        <div className="switchView">
          <nav>
            <a href="/ListUpcoming">List View | </a>
            <a href="/CalendarPage">Calendar View</a>
          </nav>
        </div>
        <div className="upcomingSessionList">
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
            <SessionTile></SessionTile>
        </div>
      </div>
    </div>
  )
}

export default ListUpcoming