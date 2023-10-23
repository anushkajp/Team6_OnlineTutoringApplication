import React, { useState } from 'react'
import "./AddTutorSession.css"
import Sidebar from '../components/sidebar'
import LogoutButton from "../components/LogoutButton"
function AddTutorSession() {

  const timeBlocks = [
    { label: "30 Min blocks", data: 30 },
    { label: "45 Min blocks", data: 45 },
    { label: "1 Hour blocks", data: 60 },
    { label: "1 Hour 15 Min blocks", data: 90 }
  ]
  function TimeBlockOptions() {
    const [active, setActive] = useState(timeBlocks[0])
    function choiceHandler(value) {
      setActive(value)
      console.log(value)
    }
    return (
      // <div>
      <select
        value={active}
        onChange={e => choiceHandler(e.target.value)}
        className="selection justify-center"
      >
        {timeBlocks.map((option, index) => (
          <option
            key={index}
            value={option.data}
          // selected={active===option}
          >{option.label}</option>
        ))}
      </select>
      // </div>
    )
  }
  const weekDays = [
    { label: 'Su', expanded_label: 'Sunday' },
    { label: 'M', expanded_label: 'Monday' },
    { label: 'Tu', expanded_label: 'Tuesday' },
    { label: 'W', expanded_label: 'Wednesday' },
    { label: 'Th', expanded_label: 'Thursday' },
    { label: 'Fr', expanded_label: 'Friday' },
    { label: 'Sa', expanded_label: 'Saturday' }
  ]

  function DayButtons() {
    const [active, setActive] = useState([])
    const toggleButton = (index) => {
      // console.log(index)
      if (active.includes(index)) {
        setActive(active.filter((activeIndex) => activeIndex !== index))
      } else {
        setActive([...active, index])
      }
      console.log(active)
    }
    return (
      <div className="justify-left">
        {weekDays.map((button, index) => (
          <button
            key={index}
            className="round-button"
            style={{ backgroundColor: active.includes(index) ? "#A92AB7" : "#D9D9D9" }}
            onClick={() => toggleButton(index)}>{button.label}</button>
        ))}
      </div>
    )
  }
  const types = ['online', 'in-person']

  function ModalityButtons() {
    const [active, setActive] = useState(types[0])
    const toggleButton = (type) => {
      setActive(type)
      console.log(type)
    }
    return (
      <div className="modality-buttons-container justify-left">
        {types.map((type) => (
          <button
            key={type}
            className={active === type ? "modality-button" : "modality-button-inactive"}
            onClick={() => toggleButton(type)}>{type}</button>
        ))}
      </div>
    )
  }
  return (
    // <div className="main-container">
      <div className="main-columns">
        <div className="left-column">
            <Sidebar className="dbPageSidebar" renderType="tutor" />
        </div>
        <div className="right-column">
          
          <div >
            <label className="subtitle-text justify-left">Enter a timeblock name </label>
            
            <div>
              <input className="timeblock" defaultValue="enter a course name or number (e.g - CS 4485, Computer Architecture)" />
            </div>

          </div>
          {/* <div> */}
            <label className="subtitle-text justify-left">Which days would you like to tutor?
            </label>
            {/* <div> */}
            {DayButtons()}
            {/* <button name='sunday' onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} className="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} /> */}

            {/* </div> */}
          {/* </div> */}
          <div className="justify-left">
            <input className="date-input" defaultValue="10:00 AM (CST)" />
            <label className="subtitle-text">to</label>
            <input className="date-input" defaultValue="12:00 AM (CST)" />
            <label className="subtitle-text">for</label>
            {TimeBlockOptions()}
            {/* <input className="date-input" value="1 Hour blocks" /> */}

          </div>
          {/* <div className="container"> */}
          <label className="subtitle-text justify-left">What modality do you prefer for your tutoring session?</label>

          {/* </div> */}
          {ModalityButtons()}
          <div >
            <label className="subtitle-text justify-left">Add more details about your tutoring timeblock (optional)</label>
            <div>
              <textarea id="outlined-multiline-flexible" className='text-area justify-left'></textarea>
            </div>

          </div>
        </div>
       </div>
      
    // </div>
  )
}

export default AddTutorSession