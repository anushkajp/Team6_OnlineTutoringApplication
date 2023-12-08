import React, { Component } from "react";
import Sidebar from "../components/sidebar";
import SessionTile from "../components/SessionTile";
import CalendarDays from "./Calendar-Days";
import CalendarEvent from "./CalendarEvent";
import Layout from "../components/Layout";

// CREDIT: https://derrickotte.medium.com/how-to-create-a-calendar-from-scratch-in-react-1f2db197454d

class CalendarPage extends Component {
  constructor(props) {
    super(props);

    this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];



    this.state = {
      currentDay: new Date(),
      sessions: {
        "12/4/2023": {
          time: "10:00",
          coursename: "CS 2336",
          student: "Student Alpha",
          tutor: "Biba Luka"
        },
        "12/5/2023": {
          time: "10:00",
          coursename: "Software Engineering",
          student: "Student Alpha",
          tutor: "Tutor A"
        },
        "12/6/2023": {
          time: "11:30",
          coursename: "Discrete Math 1",
          student: "Student Alpha",
          tutor: "Tutor B"
        },
        "12/7/2023": {
          time: "09:15",
          coursename: "Automata Theory",
          student: "Student Alpha",
          tutor: "Tutor C"
        },
        "12/8/2023": {
          time: "14:00",
          coursename: "Software Architecture",
          student: "Student Alpha",
          tutor: "Tutor D"
        },
        "12/9/2023": {
          time: "16:45",
          coursename: "Computer Graphics",
          student: "Student Alpha",
          tutor: "Tutor E"
        }
      },
    };
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  };

  moveToPreviousMonth = () => {
    const newDate = new Date(
      this.state.currentDay.getFullYear(),
      this.state.currentDay.getMonth() - 1,
      1
    );
    this.setState({ currentDay: newDate });
  };

  moveToNextMonth = () => {
    const newDate = new Date(
      this.state.currentDay.getFullYear(),
      this.state.currentDay.getMonth() + 1,
      1
    );
    this.setState({ currentDay: newDate });
  };

  render() {
    return (
      <Layout>
          <div className="switchView">
            <nav>
              <a href="/ListUpcoming">List View | </a>
              <a href="/CalendarPage">Calendar View</a>
            </nav>
          </div>

        <div className="calendar">
          <div className="calendar-header">
            <h2>
              {this.months[this.state.currentDay.getMonth()]}{" "}
              {this.state.currentDay.getFullYear()}
              <br></br>
              <br></br>
              <div className="month-navigation">
                <button onClick={this.moveToPreviousMonth}>&lt;</button>
                <button onClick={this.moveToNextMonth}>&gt;</button>
              </div>
            </h2>
          </div>
          <div className="calendar-body">
            <div className="table-header">
              {this.weekdays.map((weekday) => {
                return (
                  <div className="weekday" key={weekday}>
                    <p>{weekday}</p>
                  </div>
                );
              })}
            </div>
            <CalendarDays
              day={this.state.currentDay}
              changeCurrentDay={this.changeCurrentDay}
              sessions={this.state.sessions}
            />
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Layout>
    );
  }
}

export default CalendarPage;
