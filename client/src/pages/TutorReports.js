import React from 'react'
import ReviewTile from '../components/ReviewTile'
import Sidebar from '../components/sidebar'
import { fetchFromAPI } from '../services/api' 

const TutorReports = (props) => {

  const [reviews, setReviews] = useState([]); //??

  useEffect(() => {
    fetchFromAPI(`${props.renderType}/${props.userName}`) 
      .then(data => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          tutorId: value.tutorUsername,
          studentId: value.studentUsername,
          rating: value.rating,
          description: value.description      
        }
        ));
        setReviews(render_data[0]); //??
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
    }, []);

    
    const tiles = reviews.map((review, index) => (
      <ReviewTile
        key={index} //??
        tutorId = {review.tutorUsername}
        studentId = {review.studentUsername}
        rating = {review.rating}
        description = {review.description}
      />
    ));

  /*

  Came up with this first:
  const TutorReports = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchFromAPI('tutor-reviews') // Replace 'tutor-reviews' with the actual API endpoint for tutor reviews
      .then(data => {
        setReviews(data); // Assuming the API returns an array of reviews
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  const tiles = reviews.map((review, index) => (
    <ReviewTile
      key={index}
      class_name={review.class_name}
      student_name={review.student_name}
      session_time={review.session_time}
      session_rating={review.session_rating}
      session_comments={review.session_comments}
    />
  ));
  */

  //Anushka's code

  /*const sampleJSON = [
    {
      "class_name": "AP Computer Science A",
      "student_name": "Anushka P",
      "session_time": "3:00 PM Tuesday",
      "session_rating": 4,
      "session_comments": "TutorTopia rules"
    },
    {
      "class_name": "Physics 101",
      "student_name": "John D",
      "session_time": "10:30 AM Wednesday",
      "session_rating": 3
    },
    {
      "class_name": "Biology Lab",
      "student_name": "Samantha L",
      "session_time": "2:15 PM Monday",
      "session_rating": 4
    },
    {
      "class_name": "Mathematics Advanced",
      "student_name": "David S",
      "session_time": "11:00 AM Thursday",
      "session_rating": 4
    },
    {
      "class_name": "History of Art",
      "student_name": "Emily B",
      "session_time": "4:45 PM Friday",
      "session_rating": 4,
      "session_comments" : "She aight"
    }
  ]*/

    /*const tiles = sampleJSON.map((review, index) => (
    <ReviewTile key={index} class_name={review.class_name}
    student_name={review.student_name}
    session_time={review.session_time}
    session_rating={review.session_rating}
    session_comments={review.session_comments}>
    </ReviewTile>
  ));*/


  // Calculate the sum of session_rating values
  const totalRatings = sampleJSON.reduce((sum, session) => sum + session.session_rating, 0);

  // Calculate the average rating
  const averageRating = totalRatings / sampleJSON.length;


  return (
    <div className="reviewPage">
      <div className="sidebar">
        <Sidebar renderType={props.renderType}></Sidebar>
      </div>
      <div className="reviewInfo">
        <div className="averageButton">
            <h5 className="averageRating">{averageRating} / 5</h5>
            <h6 className="overallRating">Overall rating from {tiles.length} reviews</h6>
        </div>
        <div className="reviewList">
          {tiles}
        </div>
      </div>
    </div>
  )
}

export default TutorReports