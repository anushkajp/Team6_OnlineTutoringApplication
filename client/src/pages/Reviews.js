import React, { useEffect, useState } from 'react';
import AddReview from '../components/AddReview';
import { fetchFromAPI } from '../services/api';
import Sidebar from '../components/sidebar';
import ReviewTile from '../components/ReviewTile';

const Reviews = (props) => {
  const [renderSessions, setPrevTutors] = useState([]);

  useEffect(() => {
    fetchFromAPI(`appointments/${props.renderType}/${props.userName}`)
      .then((data) => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          tutorId: value.tutorId,
        }));
        setPrevTutors(render_data[0]);
      })
      .catch((error) => {
        setPrevTutors({
          tutorId: "Loading...",
        });
        console.log(error);
      });
  }, [props.renderType, props.userName]);

  return (
    <div className="upcomingPage">
      <div className="sidebar">
        <Sidebar renderType={props.renderType}></Sidebar>
      </div>
      <div className="upcomingSession">
        <div className="upcomingSessionList">
          {/* AddReview component for creating reviews */}
          <AddReview
            username={props.userName} // Assuming you want to pass the username to AddReview
            // profilePicUrl={/* Provide the URL for the user's profile picture */}
          />

          <h4>Past Reviews</h4>
          {/* You can map over past reviews or display any other relevant content */}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
