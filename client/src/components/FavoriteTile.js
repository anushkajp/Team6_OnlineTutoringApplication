import React, { useState } from 'react';
const FavoriteTile = (props) => {
    return (
        <div className='tutor_info'>
            <div className='pic'>
                <img src="https://picsum.photos/400/400" alt="Profile" />
            </div>
            <h3>{props.username}</h3>
        </div>
    )
};
export default FavoriteTile;