import React, { useState } from "react";
//import { motion, useMotionValue, useTransform} from 'framer-motion';
import './discovery.css';
//import NavBar from "../nav-bar/NavBar";

const ProfileCard = ({name, age, bio, pfp}) => {
    // Function to handle click/swipe attempts
    const handleClick = () => {
        const discoveryMode = localStorage.getItem('discoveryMode') === 'true';
        if (!discoveryMode) {
            alert("Turn Discovery mode on to find your next workout partner!");
        }
        // If discovery mode is on, proceed with swipe or click action
    };

    return (
        <div className="card" onClick={handleClick}>
            <img className='card-pic shadow' src={pfp} alt='Profile pic' />
            <div className="card-text">
                <div className="card-name"><h1>{name}, {age}</h1></div>
                <div className="card-bio">{bio}</div>
            </div>
        </div>
    );
};

export default ProfileCard;
