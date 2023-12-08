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
  date,
}) => {
  const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState(false);
  const [likedTutors, setLikedTutors] = useState([]); // store liked tutors in an array
  const [selectedTutorData, setSelectedTutorData] = useState({});
  const [availability, setAvailability] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [allChunks, setAllChunks] = useState([]);
  const [splitAppointments, setSplitAppointments] = useState([]);

  // Check if bio is empty or undefined
  const hasBio = bio && bio.trim() !== "";

  // Check if subjects is empty or undefined
  const hasSubj = subjects && subjects.trim() !== "";

  const handleBook = () => {
   // console.log("handleBook is called");
    //console.log("Tutor ID:", id); // Log the ID
    const fullTutorInfo = tutorList.find((tutor) => tutor.key === id);
    if (fullTutorInfo) {
      //console.log("Booking Tutor Info:", fullTutorInfo);
      setSelectedTutorData(fullTutorInfo); // Set the full information for modal or other uses
      //console.log("selectedTutorData set to:", fullTutorInfo);
      openModalWithTutor(fullTutorInfo);
    }
  };

  // Function to convert date string to YYYY-MM-DD format
  const formatDate = (date) => {
    const dateNew = new Date(date);

    // Extracting the year, month, and day components
    const year = dateNew.getFullYear();
    const month = (dateNew.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = dateNew.getDate().toString().padStart(2, '0');

    // Formatting the date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  const chosenDate = formatDate(date)

  function createTimeChunks(startTime, endTime, updatedAppointments) {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    let chunks = [];
  
    while (start < end) {
      let currentChunkStart = formatTime12Hour(start.toISOString().substring(11, 16));
  
      // Check if this time chunk overlaps with any appointments in updatedAppointments
      const isTimeTaken = updatedAppointments.some(appointment => {
        const appointmentStartTime = formatTime12Hour(appointment.time);
        return appointmentStartTime === currentChunkStart;
      });
  
      // Increment by one hour
      start.setUTCHours(start.getUTCHours() + 1);
  
      if (!isTimeTaken) {
        // If the time slot is not taken, then add the chunk
        let currentChunkEnd = formatTime12Hour(start.toISOString().substring(11, 16));
        chunks.push(`${currentChunkStart} ${currentChunkEnd}`);
      }
    }
  
    return chunks;
  }
  

  function formatTime12Hour(time24) {
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert "00" to "12"
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  }

  useEffect(() => {
    fetchFromAPI(`availability/${username}/${selectedDay}`)
      .then((availabilityArray) => {
        if (availabilityArray && availabilityArray.length > 0) {
          const computedChunks = availabilityArray.flatMap(({ start_time, end_time }) => {
            return createTimeChunks(start_time, end_time, splitAppointments);
          });
  
          setAllChunks(computedChunks);
        }
      })
      .catch((error) => {
        console.error("Error fetching availability data:", error);
      });
  }, [username, selectedDay, splitAppointments]);  

  useEffect(() => {
    fetchFromAPI(`appointments/tutor/${username}`)
      .then(data => {
        const appointments = Object.entries(data).map(([key, appointment]) => ({
          key,
            datetime: appointment.datetime,
            length: appointment.length,
          }));
  
        setAppointments(appointments);
        //console.log(appointments)
      })
      .catch(error => {
        console.error("Error fetching appointment data:", error);
      });
  }, [username, selectedDay]);

  useEffect(() => {
    const updatedAppointments = appointments
      .map(appointment => {
        const [date, time] = appointment.datetime.split('T');
        return { ...appointment, date, time };
      })
      .filter(appointment => appointment.date == formatDate(date));
  
    setSplitAppointments(updatedAppointments);
    console.log(updatedAppointments)
  }, [appointments, chosenDate]);  

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
    //console.log("Liked Tutors:", likedTutors);
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
            <p className="subjects">no subjects available</p>
          )}
        </div>

        <div className="vertical-component">
          {hasBio ? (
            <p className="bio">{bio}</p>
          ) : (
            <p className="bio">Hey, I'm on Tutortopia!</p>
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
          date={chosenDate}
        />
      </div>
    </div>
  );
};

export default TutorTileCard;
