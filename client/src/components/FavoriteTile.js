import React, { useState } from 'react';
import "../styles/FavoriteTile.css"

const FavoriteTile = (props) => {
    return (
        <div className='favorite_container'>
            <div className="photo_container"> 
                <img className='pic' src="https://picsum.photos/75/75" alt="Profile" />
            </div>
            <div className='tutor_info'>
                <h3>{props.username}</h3>
                {props.courses && (
                    <h6><span className="h6_highlight">Courses: </span>{props.courses.join(', ')}</h6>
                )}
                <h6>{props.hours} hours tutored </h6>
            </div>
        </div>
    )
};
export default FavoriteTile;