import React, { useEffect, useState } from "react";
import TutorModal from "./TutorModal";
import { fetchFromAPI } from "../services/api";

export const TutorTileCard = ({
  id,
  pfp,
  stars,
  name,
  subjects,
  bio,
  cost,
  tutorList,
  openModalWithTutor,
  username,
  selectedDay,
}) => {
  const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState(false);
  const [likedTutors, setLikedTutors] = useState([]); // store liked tutors in an array
  const [selectedTutorData, setSelectedTutorData] = useState({});
  const [availability, setAvailability] = useState(null);
  const [allChunks, setAllChunks] = useState([]);
  console.log("tt" + selectedDay);

  // Check if bio is empty or undefined
  const hasBio = bio && bio.trim() !== "";

  // Check if subjects is empty or undefined
  const hasSubj = subjects && subjects.trim() !== "";

  const handleBook = () => {
    console.log("handleBook is called");
    console.log("Tutor ID:", id); // Log the ID
    const fullTutorInfo = tutorList.find((tutor) => tutor.key === id);
    if (fullTutorInfo) {
      console.log("Booking Tutor Info:", fullTutorInfo);
      setSelectedTutorData(fullTutorInfo); // Set the full information for modal or other uses
      console.log("selectedTutorData set to:", fullTutorInfo);
      openModalWithTutor(fullTutorInfo);
    }
  };

  function createTimeChunks(startTime, endTime) {
    // Create date objects in UTC
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    let chunks = [];

    while (start < end) {
      let currentChunkStart = formatTime12Hour(
        start.toISOString().substring(11, 16)
      );

      // Increment by one hour
      start.setUTCHours(start.getUTCHours() + 1);

      // Check if incremented start time is past the end time
      if (start > end) {
        break;
      }

      // Format the incremented time
      let currentChunkEnd = formatTime12Hour(
        start.toISOString().substring(11, 16)
      );

      chunks.push(`${currentChunkStart} - ${currentChunkEnd}`);
    }

    return chunks;
  }

  function formatTime12Hour(time24) {
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert "00" to "12"
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  }

  // Example usage
  /*   let startTime = "10:00";
  let endTime = "14:00";
  let timeChunks = createTimeChunks(startTime, endTime);
  console.log(timeChunks); */

  useEffect(() => {
    fetchFromAPI(`availability/${username}/${selectedDay}`)
      .then((availabilityArray) => {
        if (availabilityArray && availabilityArray.length > 0) {
          const computedChunks = availabilityArray.flatMap(({ start_time, end_time }) => {
            return createTimeChunks(start_time, end_time);
          });
  
          // Update state with all time chunks
          setAllChunks(computedChunks);
        }
      })
      .catch((error) => {
        console.error("Error fetching availability data:", error);
      });
  }, [username, selectedDay]);

  const close = () => {
    setModal(false); // Close the modal
  };

  const handleOpenModal = () => {
    handleBook();
    setModal(true);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    // Toggle the like state
    setLike((prevLike) => !prevLike);

    // Add or remove the tutor from the likedTutors array
    if (!like) {
      // Add the tutor
      setLikedTutors((prevTutors) => [...prevTutors, name]);
    } else {
      // Remove the tutor
      setLikedTutors((prevTutors) =>
        prevTutors.filter((tutor) => tutor !== name)
      );
    }

    // Log the list of liked tutors
    console.log("Liked Tutors:", likedTutors);
  };

  return (
    <div className="tutor-wrapper">
      <div class="left-column">
        <img src={pfp} className="profile-pic"></img>
        <p className="stars">{stars}</p>
      </div>
      <div className="right-column">
        <div className="vertical-component">
          <p className="name-tutor">{name}</p>
        </div>

        <div className="vertical-component">
          {hasSubj ? (
            <p className="subjects">{subjects}</p>
          ) : (
            <p className="subjects">No subjects available</p>
          )}
        </div>

        <div className="vertical-component">
          {hasBio ? (
            <p className="bio">{bio}</p>
          ) : (
            <p className="bio">No bio available</p>
          )}
        </div>

        <div className="vertical-component">
          <p className="heart" onClick={handleLike}>
            {like ? "♥️" : "♡"}
          </p>
        </div>

        <div className="book-button" onClick={handleOpenModal}>
          Book
        </div>
        <TutorModal
          toggle={modal}
          action={close}
          tutorData={selectedTutorData}
          availabilityData={allChunks}
        />
      </div>
    </div>
  );
};

export default TutorTileCard;
