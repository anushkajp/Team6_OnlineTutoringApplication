import React, { useEffect, useState, useContext } from 'react';
import AddReview from '../components/AddReview';
import { fetchFromAPI } from '../services/api';
import UpdateReviews from '../components/UpdateReviews';
import { UserContext } from '../UserContext'
import Layout from '../components/Layout';

const Reviews = (props) => {
  const [uniqueUsernames, setUniqueUsernames] = useState(new Set());
  const [renderReview, setPrevReviews] = useState([]);
  const { user } = useContext(UserContext);
  
  // GET ALL PAST REVIEWS FROM STUDENT
  useEffect(() => {
    // fetchFromAPI(`review/${props.renderType}/${props.userName}`)
    fetchFromAPI(`review/ajpimple`)
      .then((data) => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          description: value.description,
          rating: value.rating,
          tutorUsername: value.tutorUsername
        }));
  
        // Extract unique usernames and add them to the set
        render_data.forEach((item) => {
          setUniqueUsernames((prevSet) => new Set([...prevSet, item.tutorUsername]));
        });
  
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
  
  const [renderSessions, setPrevTutors] = useState([]);
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
                profile: tutorProfile,
              };
            });
  
            // Update state with the combined data
            setPrevTutors(updatedRenderData);
          })
          .catch((error) => {
            console.error('Error fetching tutor profiles:', error);
          });
      })
      .catch((error) => {
        setPrevTutors([
          {
            id: 'Loading...',
            tutorUsername: 'Loading...',
            datetime: 'Loading...',
            profile: "https://picsum.photos/400/400"
          },
        ]);
        console.error('Error fetching tutor usernames:', error);
      });
  }, [props.renderType, props.userName]);
  
  
  
  const addReviewTile = renderSessions.map((tutor, index) => (
    <AddReview
      key={index}
      tutorUsername={tutor.tutorUsername}
      studentUsername={props.userName}
    />
  ));
  const prevReviewTiles = renderReview.map((review, index) => (
    <UpdateReviews
      key={index}
      tutorUsername = {review.tutorUsername}
      rating = {review.rating}
      description={review.description}
      studentUsername={props.userName}
    />
  ));

  return (
      <Layout>
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
      </Layout>
  );
};

export default Reviews;

