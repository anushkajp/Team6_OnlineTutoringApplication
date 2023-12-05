import React, { useState, useEffect } from 'react'
import { fetchFromAPI, sendAPIPatchRequest } from '../services/api'
import ButtonModal from './ButtonModal';
import AddExceptionForm from './AddExceptionForm';
import ModifyTimeblockForm from './ModifyTimeblock';

function Availibilities(props) {
  const [renderAvailibilty, setAvailibility] = useState([])

  useEffect(() => {
    // useEffect for GET
    fetchFromAPI(`availability/diananle`)
      .then(data => {
        const mappedArray = Object.entries(data).map(([key, value]) => {
          // Check if the value is an array or false
          if (Array.isArray(value)) {
            // If it's an array, recursively map its subvalues
            const mappedSubvalues = value.map(subValue => {
              if (Array.isArray(subValue)) {
                // Handle nested arrays of objects
                return subValue.map(obj => {
                  return Object.entries(obj).map(([k, v]) => ({ [k]: v }));
                });
              } else {
                // Handle other arrays
                return subValue;
              }
            });
            return { [key]: mappedSubvalues };
          } else {
            // For other values, preserve them as is
            return { [key]: value };
          }
        });
        setAvailibility(mappedArray);
      })
      .catch(error => {
        setAvailibility([{
          "monday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "tuesday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "wednesday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "thursday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "friday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "saturday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "sunday": [
            {
              "start": "Loading",
              "end": "Loading",
              "online": true
            }
          ],
          "exceptions": [
            ""
          ]
        }]);
      });
  }, [props.renderType, props.userName]);

  return (
    <div>
      <ButtonModal buttonText="Add New Exceptions" modalContent={<AddExceptionForm data={renderAvailibilty} setAvailibility={setAvailibility} />} />
      <ButtonModal buttonText="Remove Timeblocks" modalContent={<ModifyTimeblockForm data={renderAvailibilty} setData={setAvailibility} />} />

      <div>
        {
          renderAvailibilty.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {Object.entries(week).map(([day, details], index) => (
                <div key={index} className="collapse">
                  <input
                    type="checkbox"
                    id={`menu_collapse_${weekIndex}_${index}_${day}`}
                  />
                  <label htmlFor={`menu_collapse_${weekIndex}_${index}_${day}`}>
                    {day}
                  </label>
                  {details === false ? (
                    <section className="avail_times">
                        <h3>None</h3>
                    </section>
                  ) : (
                    details && (
                      <section className="avail_times">
                        <ul>
                          {details.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                              {day === "exceptions" ? (
                                <>
                                  {detail}
                                </>
                              ) : (
                                <>
                                  {new Date(detail.start).toLocaleString()} to{' '}
                                  {new Date(detail.end).toLocaleString()} <br />
                                  Online: {detail.online ? 'Yes' : 'No'}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Availibilities;