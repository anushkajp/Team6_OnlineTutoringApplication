import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import pfp1 from "../assets/Profile_Pic_1.png";
import pfp2 from "../assets/Profile_Pic_2.png";
//import "font-awesome/css/font-awesome.min.css";
import { TutorTileCard } from "./TutorTile";
import TutorModal from "./TutorModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchFromAPI } from "../services/api";

// source used for like button
// https://chayanit-chaisri.medium.com/how-to-add-a-like-button-react-usestate-3f79aac27d90

function SearchTutor(props) {
  const [date, setDate] = useState(new Date());
  const [subject, setSubject] = useState("Select Subject");
  const [tutor, setTutor] = useState("Select Tutor");
  const [modal, setModal] = useState(false);
  const [tutorList, setTutorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState("Select Tutor");
  const [selectedDay, setSelectedDay] = useState("");

  function open() {
    setModal(!modal);
  }

  const handleDateChange = (date) => {
    setDate(date);
    console.log(date);
    const dayOfWeekNumber = date.getDay();
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayOfWeekString = daysOfWeek[dayOfWeekNumber];
    setSelectedDay(dayOfWeekString);
    console.log(dayOfWeekString);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTutorChange = (event) => {
    setSelectedTutor(event.target.value);
    console.log("Selected Tutor:", event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchFromAPI("tutor/")
      .then((data) => {
        const tutorList = Object.entries(data).map(([key, value]) => ({
          key,
          firstName: value.firstName,
          lastName: value.lastName,
          password: value.password,
          username: value.username,
          major: value.major,
          courses: value.courses || [],
          phone: value.phone,
          email: value.email,
          longBio: value.longBio,
          shortBio: value.shortBio,
          monday: value.monday,
          tuesday: value.tuesday,
          wednesday: value.wednesday,
          thursday: value.thursday,
          friday: value.friday,
          saturday: value.saturday,
          sunday: value.sunday,
          exceptionsAvailability: value.exceptionsAvailability,
          profilePic: value.profilePic,
          hours: value.hours,
          rating: value.rating,
          bgCheck: value.bgCheck,
          totalHours: value.totalHours,
        }));
        setTutorList(tutorList);
        setIsLoading(false);

        const subjects = new Set();
        tutorList.forEach((tutor) => {
          if (tutor.courses) {
            tutor.courses
              .filter((course) => course)
              .forEach((course) => subjects.add(course));
          }
        });

        setAllSubjects(Array.from(subjects));
        console.log(subjects);

        const uniqueSubjects = Array.from(subjects);
        setAllSubjects(uniqueSubjects);
        console.log("Unique subjects:", uniqueSubjects);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        console.error("Error fetching tutor data:", error);
      });
  }, []);

  const getFilteredTutors = () => {
    return tutorList.filter((tutorItem) => {
      const matchesSubject =
        subject === "Select Subject" ||
        (tutorItem.courses && tutorItem.courses.includes(subject));
      const matchesTutor =
        selectedTutor === "Select Tutor" ||
        `${tutorItem.firstName} ${tutorItem.lastName}` === selectedTutor;

      /* const hasMondayAvailability = tutorItem.monday && tutorItem.monday.length > 0;
      const hasTuesdayAvailability = tutorItem.tuesday && tutorItem.tuesday.length > 0;
      const hasWednesdayAvailability = tutorItem.wednesday && tutorItem.wednesday.length > 0;
      const hasThursdayAvailability = tutorItem.thursday && tutorItem.thursday.length > 0;
      const hasFridayAvailability = tutorItem.friday && tutorItem.friday.length > 0;
      const hasSaturdayAvailability = tutorItem.saturday && tutorItem.saturday.length > 0;
      const hasSundayAvailability = tutorItem.sunday && tutorItem.sunday.length > 0;

      console.log(`Availability for ${tutorItem.firstName} ${tutorItem.lastName}:`);
      console.log(`Monday: ${hasMondayAvailability}`);
      console.log(`Tuesday: ${hasTuesdayAvailability}`);
      console.log(`Wednesday: ${hasWednesdayAvailability}`);
      console.log(`Thursday: ${hasThursdayAvailability}`);
      console.log(`Friday: ${hasFridayAvailability}`);
      console.log(`Saturday: ${hasSaturdayAvailability}`);
      console.log(`Sunday: ${hasSundayAvailability}`); */

      return matchesSubject && matchesTutor;
    });
  };

  return (
    <div>
      <div className="main-container">
        <Sidebar className="dbPageSidebar" renderType="student"></Sidebar>

        <div className="main-columns">
          <div className="column">
            <p className="find-text">Find your tutor</p>

            <div className="container-filters">
              <div className="box-filters">
                <div className="text-under-find">Date</div>
                <DatePicker
                  className="base-input-style datepicker-input"
                  selected={date}
                  onChange={handleDateChange}
                />
              </div>
              <div className="box-filters">
                <div className="text-under-find">Subject</div>
                <select
                  id="filterSelect"
                  onChange={handleSubjectChange}
                  value={subject}
                >
                  <option value="Select Subject">Select Subject</option>
                  {allSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="box-filters">
                <div className="text-under-find">Tutor</div>
                <select
                  id="filterSelect"
                  onChange={handleTutorChange}
                  value={tutor}
                >
                  <option value="Select Tutor">Select Tutor</option>
                  {tutorList.map((tutor) => (
                    <option
                      key={tutor.key}
                      value={`${tutor.firstName} ${tutor.lastName}`}
                    >
                      {tutor.firstName} {tutor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="tutor-container">
              {getFilteredTutors().map((filteredTutor) => (
                <TutorTileCard
                  key={filteredTutor.key}
                  pfp={filteredTutor.profilePic}
                  stars={`⭐ ${filteredTutor.rating}`}
                  name={`${filteredTutor.firstName} ${filteredTutor.lastName}`}
                  subjects={filteredTutor.courses.join(", ")}
                  bio={filteredTutor.shortBio}
                  cost={50}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="main-columns">
          {/* <h2> Third column </h2>
          <p> This is Third column of our grid system</p> */}
          <TutorModal
            toggle={modal}
            action={open}
            selectedTutor={selectedTutor}
            tutorList={tutorList}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchTutor;
