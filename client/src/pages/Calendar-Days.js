import React from "react";
import "./Calendar.css";
import CalendarEvent from "./CalendarEvent";

function CalendarDays(props) {
  let firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day) => {
        const dateKey = `${day.month + 1}/${day.number}/${day.year}`;
        return (
          <div
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() => props.changeCurrentDay(day)}
            key={`${day.month}-${day.number}-${day.year}`}
          >
            <p>{day.number}</p>
            {props.sessions[dateKey] && (
              <CalendarEvent date={dateKey} sessions={props.sessions} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
