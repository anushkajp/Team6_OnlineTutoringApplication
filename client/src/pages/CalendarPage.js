import { Component } from "react";
import Sidebar from "../components/sidebar";
import SessionTile from "../components/SessionTile";
import CalendarDays from "./Calendar-Days";
import CalendarEvent from "./CalendarEvent";

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
        "10/7/2023": {
          time: "12:30",
          coursename: "Data Structures",
          student: "Best Student 22",
          tutor: "Best Tutor 1",
        },
        "10/8/2023": {
          time: "11:00",
          coursename: "Discrete Math",
          student: "Top Student 23",
          tutor: "Top Tutor 2",
        },
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
