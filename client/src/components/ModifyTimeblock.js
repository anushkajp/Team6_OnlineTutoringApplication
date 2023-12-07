import React from 'react';
import { sendAPIPatchRequest } from '../services/api';

const ModifyTimeblockForm = ({ data, setData }) => {
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
        sendAPIPatchRequest(`tutor/diananle`, { "availability": { ...transformArrayforJSON } })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
        })
    };

    return (
        <div>
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
                                        <h3>None</h3>
                                    </section>
                                ) : (
                                    details && (
                                        <section className="avail_times_m">
                                            <ul>
                                                {details.map((detail, detailIndex) => (
                                                    <li key={detailIndex}>
                                                        {day === "exceptions" ? (
                                                            <>
                                                                {detail}
                                                                {detail.length > 0 && (
                                                                    <button onClick={() => handleRemoveItem(weekIndex, day, detailIndex)}>
                                                                        Remove
                                                                    </button>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {new Date(detail.start).toLocaleString()} to{' '}
                                                                {new Date(detail.end).toLocaleString()} <br />
                                                                Online: {detail.online ? 'Yes' : 'No'}
                                                                {detail && (
                                                                    <button onClick={() => handleRemoveItem(weekIndex, day, detailIndex)}>
                                                                        Remove
                                                                    </button>
                                                                )}
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
    )
}

export default ModifyTimeblockForm;
