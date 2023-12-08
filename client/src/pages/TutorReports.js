import React from 'react'
import ReviewTile from '../components/ReviewTile'
import Layout from '../components/Layout'
import { fetchFromAPI } from '../services/api'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../UserContext'

const TutorReports = (props) => {

  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchFromAPI(`review/${user.username}`)
      .then(data => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          tutorUsername: value.tutorUsername,
          studentUsername: value.studentUsername,
          rating: parseFloat(value.rating),
          description: value.description
        }
        ));
        console.log(render_data)
        setReviews(render_data)
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);
  
  const tiles = reviews.map((review, index) => (
    <ReviewTile
      key={index}
      tutorId={review.tutorUsername}
      studentId={review.studentUsername}
      rating={review.rating}
      description={review.description}
    />
  ));

  // Calculate the sum of ratings
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  console.log('Total Ratings:', totalRatings);

  // Calculate the average rating
  const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(2) : 0;
  console.log('Average Rating:', averageRating);

  return (
    <Layout>
      <div className="reviewPage">
        <div className="reviewInfo">
          <div className="averageButton">
            <h5 className="averageRating">{averageRating} / 5</h5>
            <h6 className="overallRating">Overall rating from {tiles.length} reviews</h6>
          </div>
          <div className="reviewListContainer">
            <div className="reviewList">
              {tiles}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TutorReports;