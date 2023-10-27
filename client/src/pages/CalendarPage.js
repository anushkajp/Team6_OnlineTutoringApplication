import React, { Component } from "react";
import Sidebar from "../components/sidebar";
import SessionTile from "../components/SessionTile";
import CalendarDays from "./Calendar-Days";
import CalendarEvent from "./CalendarEvent";
import "./Calendar.css";

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
        "October 7, 2023": {
          // Use the same date format
          time: "12:30",
          coursename: "AP Computer Science",
          student: "Best Student 22",
          tutor: "1",
        },
        "October 8, 2023": {
          // Use the same date format
          time: "11:00",
          coursename: "Discrete Math",
          student: "Top Student 23",
          tutor: "2",
        },
        // Add more events for other days with the same date format
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
      <div>
        <div className="sidebar">
          <Sidebar renderType={this.props.renderType} />
        </div>
        <div className="upcomingSession">
          <div className="switchView">
            <nav>
              <a href="/ListUpcoming">List View | </a>
              <a href="/CalendarPage">Calendar View</a>
            </nav>
          </div>
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
      </div>
    );
  }
}

export default CalendarPage;
