import React, { useContext} from 'react';
import { sendAPIPatchRequest } from '../services/api';
import "../styles/button_modal.css"
import { Delete } from "lucide-react";
import { UserContext } from "../UserContext";

const ModifyTimeblockForm = ({ data, setData }) => {
    const {user} = useContext(UserContext);
    
    const handleRemoveItem = (weekIndex, day, detailIndex) => {
        const updatedArray = data.map((week, index) => {
            if (index === weekIndex) {
                const updatedWeek = { ...week };
                if (day in updatedWeek) {
                    const updatedDetails = [...updatedWeek[day]];
                    updatedDetails.splice(detailIndex, 1);
                    updatedWeek[day] = updatedDetails.length > 0 ? updatedDetails : false;
                }
                return updatedWeek;
            }
            return week;
        });

        console.log(data);
        console.log(updatedArray);
        setData(updatedArray);
        patchData(updatedArray);
    };

    function patchData(dataArray) {
        const transformArrayforJSON = dataArray.reduce((acc, item) => {
            const key = Object.keys(item)[0]; 
            if (key) {
                acc[key] = item[key];
            }
            return acc;
        }, {});
        sendAPIPatchRequest(`tutor/${user.username}`, { "availability": { ...transformArrayforJSON } })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
        })
    };

    return (
        <div>
            <h3>Remove a timeblock/exception</h3>
            {
                data.map((week, weekIndex) => (
                    <div key={weekIndex} className="week">
                        {Object.entries(week).map(([day, details], index) => (
                            <div key={index} className="collapse_m">
                                <input
                                    type="checkbox"
                                    id={`menu_collapse_${weekIndex}_${index}_${day}_m`}
                                />
                                <label htmlFor={`menu_collapse_${weekIndex}_${index}_${day}_m`}>
                                    {day}
                                </label>
                                {details === false ? (
                                    <section className="avail_times_m">
                                        <h6>None</h6>
                                    </section>
                                ) : (
                                    details && (
                                        <section className="avail_times_m">
                                            <ul>
                                                {details.map((detail, detailIndex) => (
                                                    <li key={detailIndex}>
                                                        {day === "exceptions" ? (
                                                            <h6>
                                                                {detail}
                                                                {detail.length > 0 && (
                                                                    <button className="delete_timeblock" onClick={() => handleRemoveItem(weekIndex, day, detailIndex)}>
                                                                       <Delete />
                                                                    </button>
                                                                )}
                                                            </h6>
                                                        ) : (
                                                            <h6>
                                                                {new Date(detail.start_time).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} to{' '}
                                                                {new Date(detail.end_time).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} <br />
                                                                Online: {detail.online ? 'Yes' : 'No'}
                                                                {detail && (
                                                                    <button className="delete_timeblock" onClick={() => handleRemoveItem(weekIndex, day, detailIndex)}>
                                                                        <Delete />
                                                                    </button>
                                                                )}
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
    )
}

export default ModifyTimeblockForm;
