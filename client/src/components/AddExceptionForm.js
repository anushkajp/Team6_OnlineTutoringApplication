import React, { useState, useContext } from 'react';
import { sendAPIPatchRequest } from '../services/api'
import "../styles/button_modal.css"
import { UserContext } from "../UserContext"

const AddExceptionForm = ({ data, setAvailibility }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const { user } = useContext(UserContext)

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        console.log(selectedDate);
    };

    const addDate = () => {
        if (selectedDate) {
            const exceptionsObject = data.find(item => "exceptions" in item);
          
            if (exceptionsObject) {
              exceptionsObject.exceptions = exceptionsObject.exceptions ? [...exceptionsObject.exceptions, selectedDate] : [selectedDate];
            } else {
              const newExceptionsObject = { exceptions: [selectedDate] };
              data.push(newExceptionsObject);
            }
            console.log(data)
            setAvailibility([...data]);  
            patchData([...data]);
          } else {
            alert('Please provide a valid date.');
          }
    };

    function patchData(dataArray) {
        const transformArrayforJSON = dataArray.reduce((acc, item) => {
            const key = Object.keys(item)[0]; 
            if (key) {
              acc[key] = item[key];
            }
            return acc;
          }, {});

        sendAPIPatchRequest(`tutor/${user.username}`, { "availability": {...transformArrayforJSON} })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    };

    return (
        <div className="date_picker_modal">
            <h2>Add an exception date</h2>
            <label className="datepicker">
                <input type="date" value={selectedDate} onChange={handleDateChange} />
            </label>
            <button className="bm_button" onClick={addDate}>Add Date to Exceptions</button>
        </div>
    );
};

export default AddExceptionForm;
