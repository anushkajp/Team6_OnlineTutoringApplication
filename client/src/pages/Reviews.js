import React, { useEffect, useState } from 'react';
import AddReview from '../components/AddReview';
import { fetchFromAPI } from '../services/api';
import Sidebar from '../components/sidebar';
import ReviewTile from '../components/ReviewTile';
import ReviewTileStudent from '../components/ReviewTileStudent';
const Reviews = (props) => {
  const [renderSessions, setPrevTutors] = useState([]);

  // GET ALL APPOINTMENTS FROM STUDENT
  useEffect(() => {
    // fetchFromAPI(`appointments/${props.renderType}/${props.userName}`)
    fetchFromAPI(`appointments/student/ajpimple`)
      .then((data) => {
        // CREATE SET OF UNIQUE USERNAMES
        const uniqueUsernames = new Set();
        const render_data = Object.entries(data).filter(([key, value]) => {
          const tutorUsername = value.tutorUsername;
          if (!uniqueUsernames.has(tutorUsername)) {
            uniqueUsernames.add(tutorUsername);
            return true;
          }
          return false;
        })
        .map(([key, value]) => ({
          key,
          id:value.id,
          tutorUsername: value.tutorUsername,
          datetime: value.datetime,
        }))
        setPrevTutors(render_data);
      })
      .catch((error) => {
        setPrevTutors([
          {
            id: "Loading...",
            tutorUsername: "Loading...",
            datetime: "Loading...",
          },
        ]);
        console.log(error);
      });
  }, [props.renderType, props.userName]);
  const [renderReview, setPrevReviews] = useState([]);
  // GET ALL PAST REVIEWS FROM STUDENT
  useEffect(() => {
    // fetchFromAPI(`appointments/${props.renderType}/${props.userName}`)
    fetchFromAPI(`review/student/ajpimple`)
      .then((data) => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          description: value.description,
          rating: value.rating,
          tutorUsername: value.tutorId
        }))
        setPrevReviews(render_data);
      })
      .catch((error) => {
        setPrevReviews([
          {
            description: "Loading...",
            rating: "Loading...",
            tutorUsername: "Loading...",
          },
        ]);
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
          <h4>Add a review</h4>
          {/* Map over each tutor and create an AddReview tile */}
          {renderSessions.map((tutor, index) => (
            <AddReview
              key={index}
              username={tutor.tutorUsername} // Assuming you want to pass the username to AddReview
              // tutorId={tutor.tutorId} // Pass other relevant props if needed
              // profilePicUrl={/* Provide the URL for the user's profile picture */}
            />
          ))}

          <h4>Past Reviews</h4>
          {
            renderReview.map((review, index) => (
              <ReviewTileStudent
                tutorUsername = {review.tutorUsername}
                rating = {review.rating}
                description={review.description}
              />
          ))}
          {/* You can map over past reviews or display any other relevant content */}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
