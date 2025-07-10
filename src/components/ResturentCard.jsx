import React from 'react';
import { CDN_URL } from '../utils/constants';


const ResturentCard = (resData) => {
    // console.log(CDN_URL)
    const {name, cuisines, avgRating, sla, cloudinaryImageId}= resData?.resData?.info;

    return (
        <div className='res-card' >
        <img className='res-logo' alt='res-logo' src={CDN_URL+cloudinaryImageId}/>
        <h3>{name}</h3>
        <h4>Cuisine: {cuisines.join(', ')}</h4>
        <h4>Rating: {avgRating}</h4>
        <h4>Delivery Time: {sla.slaString}</h4>
        </div>
    );
}

export default ResturentCard;
