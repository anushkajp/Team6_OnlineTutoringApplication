import React, { useState, useContext } from 'react'
import Sidebar from '../components/sidebar'
import LogoutButton from "../components/LogoutButton"
import  {Availability}  from "../comp_models/availability"
// import TimeBlock from '../comp_models/timeBlock'
import { UserContext } from "../UserContext"

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
  const types = ['online', 'in-person']
  const timeBlocks = [
    { label: "30 Min blocks", data: 30 },
    { label: "45 Min blocks", data: 45 },
    { label: "1 Hour blocks", data: 60 },
    { label: "1 Hour 15 Min blocks", data: 90 }
  ]

  const initialAvailability = new Availability()
  const [dowSelection, setDowSelection] = useState([])
  const [timeBlockSize, setTimeBlockSize] = useState(timeBlocks[0])
  const [modality, setModality] = useState(types[0])
  const [boundedTime, setBoundedTime] = useState({timeLower:"10:00",timeUpper:"12:00"})


  function TimeBlockOptions() {
    function choiceHandler(value) {
      setTimeBlockSize(value)
      console.log(value)
    }

    return (
      // <div>
      <select
        value={timeBlockSize}
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


  function DayButtons() {
    const toggleButton = (index) => {
      // console.log(index)
      if (dowSelection.includes(index)) {
        setDowSelection(dowSelection.filter((activeIndex) => activeIndex !== index))
      } else {
        setDowSelection([...dowSelection, index])
      }
      console.log(dowSelection)
    }
    return (
      <div className="justify-left">
        {weekDays.map((button, index) => (
          <button
            key={index}
            className="round-button"
            style={{ backgroundColor: dowSelection.includes(index) ? "#A92AB7" : "#D9D9D9" }}
            onClick={() => toggleButton(index)}>{button.label}</button>
        ))}
      </div>
    )
  }
  

  function ModalityButtons() {
    const toggleButton = (type) => {
      setModality(type)
      console.log(type)
    }
    return (
      <div className="modality-buttons-container justify-left">
        {types.map((type) => (
          <button
            key={type}
            className={modality === type ? "modality-button" : "modality-button-inactive"}
            onClick={() => toggleButton(type)}>{type}</button>
        ))}
      </div>
    )
  }
  const handleTime = (time) =>{
    
    const setUpperBound = parseInt(boundedTime.timeUpper.split(":")[0])
    const setLowerBound = parseInt(boundedTime.timeLower.split(":")[0])
    const comparisonBound = parseInt(time.target.value.split(":")[0])
    if (time.target.id==="timeLower"){
      const newLowerBound = parseInt(time.target.value.split(":")[0])
      console.log("Lower bound of time is : "+time.target.value)
      if (comparisonBound<=setUpperBound){
        setBoundedTime({...boundedTime,[time.target.id]:time.target.value})
      }else{
        alert("The start time you chose is after the end time!")
      }
    }else{
      if (comparisonBound<=setLowerBound){
        setBoundedTime({...boundedTime,[time.target.id]:time.target.value})
      }else{
        alert("The end time you chose is before the start time!")
      }
    }
  }
  return (
    <div >
      <div className='title-logout-wrapper'>
        <div className="title-logout">
          <label className="title-text">Add a New Tutor Session</label>
          <LogoutButton id="logout-button"></LogoutButton>

        </div>
      </div>
      <div className="main-columns">

        {/* <div className="left-column"> */}
        <Sidebar renderType={UserContext.accountType} />
        {/* </div> */}
        <div className="right-column">


          <label className="subtitle-text justify-left">Which days would you like to tutor?
          </label>

          {DayButtons()}

          <div className="justify-left">
            <input className="date-input justify-center" id="timeLower" type="time" defaultValue={boundedTime[0]} onChange={(e)=>handleTime(e)} />
            <label className="subtitle-text">to</label>
            <input className="date-input justify-center" id="timeUpper" type ="time" defaultValue={boundedTime[1]} />
            <label className="subtitle-text">for</label>
            {TimeBlockOptions()}

          </div>

          <label className="subtitle-text justify-left">What modality do you prefer for your tutoring session?</label>
          {ModalityButtons()}

        </div>
      </div>

    </div>
  )
}

export default AddTutorSession