import React, { useState } from 'react';
const FavoriteTile = (props) => {
    return (
        <div className='favorite_container'>
            <div className='pic'>
                <img src="https://picsum.photos/400/400" alt="Profile" />
            </div>
            <div className='tutor_info'>
                <h3>{props.username}</h3>
                {props.courses && (
                    <h4>{props.courses.join(', ')}</h4>
                )}
                <h4>{props.hours}</h4>
            </div>
        </div>
    )
};
export default FavoriteTile;