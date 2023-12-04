import React, { useEffect, useState } from 'react';
import AddReview from '../components/AddReview';
import { fetchFromAPI } from '../services/api';
import Sidebar from '../components/sidebar';
import UpdateReviews from '../components/UpdateReviews';

const Reviews = (props) => {
  const [renderSessions, setPrevTutors] = useState([]);

  // GET ALL APPOINTMENTS FROM STUDENT
  // useEffect(() => {
  //   // fetchFromAPI(`appointments/${props.renderType}/${props.userName}`)
  //   fetchFromAPI(`appointments/student/ajpimple`)
  //     .then((data) => {
  //       // CREATE SET OF UNIQUE USERNAMES
  //       const uniqueUsernames = new Set();
  //       const render_data = Object.entries(data).filter(([key, value]) => {
  //         const tutorUsername = value.tutorUsername;
  //         if (!uniqueUsernames.has(tutorUsername)) {
  //           uniqueUsernames.add(tutorUsername);
  //           return true;
  //         }
  //         return false;
  //       })
  //       .map(([key, value]) => ({
  //         key,
  //         id:value.id,
  //         tutorUsername: value.tutorUsername,
  //         datetime: value.datetime,
  //       }))
  //       setPrevTutors(render_data);
  //     })
  //     .catch((error) => {
  //       setPrevTutors([
  //         {
  //           id: "Loading...",
  //           tutorUsername: "Loading...",
  //           datetime: "Loading...",
  //         },
  //       ]);
  //       console.log(error);
  //     });
  // }, [props.renderType, props.userName]);
  useEffect(() => {
    // Fetch tutor usernames
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
          id: value.id,
          tutorUsername: value.tutorUsername,
          datetime: value.datetime,
        }));
  
        // Fetch tutor profiles for each tutor username
        Promise.all(
          render_data.map(({ tutorUsername }) =>
            fetchFromAPI(`tutor/${tutorUsername}`)
          )
        )
          .then((profileDataArray) => {
            // Combine tutor profiles with existing data
            const updatedRenderData = render_data.map((renderItem, index) => {
              const tutorProfile = profileDataArray[index];
              return {
                ...renderItem,
                profile: tutorProfile, // Assuming the profile data is stored in the 'profile' property
              };
            });
  
            // Update state with the combined data
            setPrevTutors(updatedRenderData);
          })
          .catch((error) => {
            console.error('Error fetching tutor profiles:', error);
            // Handle errors if necessary
          });
      })
      .catch((error) => {
        setPrevTutors([
          {
            id: 'Loading...',
            tutorUsername: 'Loading...',
            datetime: 'Loading...',
          },
        ]);
        console.error('Error fetching tutor usernames:', error);
      });
  }, [props.renderType, props.userName]);
  
  const [renderReview, setPrevReviews] = useState([]);
  // GET ALL PAST REVIEWS FROM STUDENT
  useEffect(() => {
    // fetchFromAPI(`review/${props.renderType}/${props.userName}`)
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
  const addReviewTile = renderSessions.map((tutor, index) => (
    <AddReview
      key={index}
      username={tutor.tutorUsername}
    />
  ));
  const prevReviewTiles = renderReview.map((review, index) => (
    <UpdateReviews
      key={index}
      tutorUsername = {review.tutorUsername}
      rating = {review.rating}
      description={review.description}
    />
  ));

  return (
    <div>
      <div className="sidebar">
        <Sidebar renderType={props.renderType}></Sidebar>
      </div>
      <div className='review'>
        <h3>Add a review</h3>
        <div className='add_review_contents'>
          {/* Map over each tutor and create an AddReview tile */}
          {addReviewTile}
        </div>
        <h3 className='review_title'>Past Reviews</h3>
        <div className='update_review_contents'>
          {prevReviewTiles}
          {/* You can map over past reviews or display any other relevant content */}
        </div>  
      </div>
    </div>
  );
};

export default Reviews;
