  import React, { useState, useEffect, useContext } from 'react'
import { fetchFromAPI, sendAPIPatchRequest } from '../services/api'
import ButtonModal from './ButtonModal';
import AddExceptionForm from './AddExceptionForm';
import ModifyTimeblockForm from './ModifyTimeblock';
import { UserContext } from '../UserContext'
import "../styles/availibilities.css"

function Availibilities(props) {
  const { user } = useContext(UserContext)
  const [renderAvailibilty, setAvailibility] = useState([])

  useEffect(() => {
    // useEffect for GET
    fetchFromAPI(`availability/${user.username}`)
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
              "start_time": "Loading",
              "end_time": "Loading",
              "online": true
            }
          ],
          "tuesday": [
            {
              "start_time": "Loading",
              "end_time": "Loading",
              "online": true
            }
          ],
          "wednesday": [
            {
              "start_time": "Loading",
              "end_time": "Loading",
              "online": true
            }
          ],
          "thursday": [
            {
              "start_time": "Loading",
              "end_time": "Loading",
              "online": true
            }
          ],
          "friday": [
            {
              "start_time": "Loading",
              "end_time": "Loading",
              "online": true
            }
          ],
          "saturday": [
            {
              "start_time": "Loading",
              "end_time": "Loading",
              "online": true
            }
          ],
          "sunday": [
            {
              "start_time": "Loading",
              "end_time": "Loading",
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
    <div className="availSide">
      <div className="avail_buttons">
        <ButtonModal buttonText="Add New Exceptions" modalContent={<AddExceptionForm data={renderAvailibilty} setAvailibility={setAvailibility} />} />
        <ButtonModal buttonText="Remove Timeblocks" modalContent={<ModifyTimeblockForm data={renderAvailibilty} setData={setAvailibility} />} />
      </div>

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
                        <h6>None</h6>
                    </section>
                  ) : (
                    details && (
                      <section className="avail_times">
                        <ul>
                          {details.map((detail, detailIndex) => (
                            <li className="avail_item" key={detailIndex}>
                              {day === "exceptions" ? (
                                <h6>
                                  {detail}
                                </h6>
                              ) : (
                                <h6>
                                  {detail.start_time} to{' '}
                                  {detail.end_time} <br />
                                  Online: {detail.online ? 'Yes' : 'No'}
                                </h6>
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