import React, { useState } from 'react'
import "./AddTutorSession.css"

function AddTutorSession() {


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
      if (active.includes(index)) {
        setActive(active.filter((activeIndex) => activeIndex !== index))
      } else {
        setActive([...active, index])
      }
    }
    return (
      <div>
        {weekDays.map((button, index) => (
          <button
            key={index}
            className="round-button"
            style={{ backgroundColor: active.includes(index) ? "#D9D9D9" : "#A92AB7" }}
            onClick={() => toggleButton(index)}>{button.label}</button>
        ))}
      </div>
    )
  }
  const types = ['online', 'in-person']

  function ModalityButtons() {
    const [active, setActive] = useState(types[0])

    return (
      <div className = "modality-buttons-container">
        {types.map((type) => (
          <button
            key={type}
            className={active === type ? "modality-button" : "modality-button-inactive"}
            onClick={() => setActive(type)}>{type}</button>
        ))}
      </div>
    )
  }
  return (
    <div>AddTutorSession
      <div class="main-container">
        <div class="main-columns"></div>
        <div class="main-columns">
          <div>
            <label class="subtitle-text">Enter a timeblock name </label>
            <div>
              <input class="timeblock" defaultValue="enter a course name or number (e.g - CS 4485, Computer Architecture)" />
            </div>

          </div>
          <div>
            <label class="subtitle-text">Which days would you like to tutor?
            </label>
            <div>
              {DayButtons()}
              {/* <button name='sunday' onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} />
              <button onClick={handleClick} class="round-button" style={{ backgroundColor: active ? "#D9D9D9" : "#A92AB7" }} /> */}

            </div>
          </div>
          <div>
            <input class="date-input" value="10:00 AM (CST)" />
            <label class="subtitle-text">to</label>
            <input class="date-input" value="12:00 AM (CST)" />
            <label class="subtitle-text">for</label>
            <input class="date-input" value="1 Hour blocks" />

          </div>
          <div>
            <label class="subtitle-text">What modality do you prefer for your tutoring session?</label>
            {ModalityButtons()}
          </div>
          <div>
            <label className="subtitle-text">Add more details about your tutoring timeblock (optional)</label>
            <div>
            <textarea id="outlined-multiline-flexible" className='text-area'></textarea>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTutorSession