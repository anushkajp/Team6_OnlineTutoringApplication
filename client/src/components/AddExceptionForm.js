import React, { useState } from 'react';
import { sendAPIPatchRequest } from '../services/api'

const AddExceptionForm = ({ data, setAvailibility }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        console.log(selectedDate);
    };

    const addDate = () => {
        if (selectedDate) {
            // Find the item with the "exceptions" key
            const exceptionsObject = data.find(item => "exceptions" in item);
          
            if (exceptionsObject) {
              // Update the existing exceptions array
              exceptionsObject.exceptions = exceptionsObject.exceptions ? [...exceptionsObject.exceptions, selectedDate] : [selectedDate];
            } else {
              // If exceptionsObject is not found, create a new object with the "exceptions" key
              const newExceptionsObject = { exceptions: [selectedDate] };
              data.push(newExceptionsObject);
            }
          
            // Update the parent array
            setAvailibility([...data]);  // Creating a new array to trigger a state update
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

        sendAPIPatchRequest(`tutor/diananle`, { "availability": {...transformArrayforJSON} })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    };


    return (
        <div>
            <label>
                Date:
                <input type="date" value={selectedDate} onChange={handleDateChange} />
            </label>

            <button onClick={addDate}>Add Date to Exceptions</button>
        </div>
    );
};

export default AddExceptionForm;
