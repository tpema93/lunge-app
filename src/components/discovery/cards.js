import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "./profile-card";
import TinderCard from 'react-tinder-card'
import { Link } from "react-router-dom";




function Cards() {
    const location = useLocation(); // Get location object
    const filters = location.state?.filters || {}; // Extract filters from navigation state

    const initialUsers = [
        {
            name: 'Benson',
            age: 28,
            bio: 'I enjoy hiking and photography. If those are your hobbies too, hit me up!',
            pfp: 'https://media.istockphoto.com/id/1292227476/photo/young-man-taking-a-selfie-with-mobile-smart-phone-hiking-mountains-happy-smiling-guy-looking.jpg?s=612x612&w=0&k=20&c=BJfAq1uAabPvrKBNeNcbcSOlNhmidip9lAEZX6CV_B8=',
            gender: 'male',
            activities: ['Hiking']
        },
        {
            name: 'Maria',
            age: 63,
            bio: "I am a certified crossfit trainer and I opened up my own gym. Contact me if interested in becoming a trainer or taking courses at my gym!",
            pfp: 'https://i.pinimg.com/736x/52/d0/ca/52d0cab75e1aef9af4cc1c7a02cf12af.jpg',
            gender: 'female',
            activities: ['Crossfit']
        },
        {
            name: 'Lebron',
            age: 35,
            bio: 'I can train you to be the next PRO basketball star.',
            pfp: 'https://cdn.vox-cdn.com/thumbor/02T9PnIx_71QVDkmG4GjyDNBIiI=/0x0:4608x3067/1820x1213/filters:focal(1815x310:2551x1046):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66572608/1202371161.jpg.0.jpg',
            gender: 'male',
            activities: ['Basketball']
        },
        {
            name: 'Jenny',
            age: 18,
            bio: "Looking for a tennis instructor <3",
            pfp: 'https://cdn.acidcow.com/pics/20130205/nice_girls_42.jpg',
            gender: 'female',
            activities: ['Tennis']
        },
        {
            name: 'Linus',
            age: 75,
            bio: "Retired man who justs wants a friend to golf or hoop with!",
            pfp: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/rZJIMvhmliwmde8a6/videoblocks-elderly-man-smiling-outdoors-face-of-happy-old-male_rhbc1x41b_thumbnail-1080_01.png',
            gender: 'male',
            activities: ['Basketball', 'Golf']
        },
        {
            name: 'Jared',
            age: 22,
            bio: "New to the area and looking to find someone to teach me how to catch some waves!",
            pfp: 'https://img.freepik.com/premium-photo/bright-confident-candid-portrait-carefree-young-20s-asian-man-smiling-cheerfully_817921-6230.jpg',
            gender: 'male',
            activities: ['Surfing']
        },
        {
            name: 'Charlie',
            age: 46,
            bio: "Want to find a new hobby, open to try any activity. ",
            pfp: 'https://images.pexels.com/photos/1655815/pexels-photo-1655815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            gender: 'other',
            activities: ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Golf', 'Swimming', 'Volleyball', 'Cycling', 'Running', 'Badminton', 'Weightlifting', 'Hiking', 'Yoga', 'Boxing', 'Skateboarding', 'Skiing', 'Snowboarding', 'Crossfit', 'Gymnastics', 'Surfing']
        },

    ];
    const [users, setUsers] = useState(initialUsers);
    const [isMatch, setIsMatch] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        applyFilters();
    }, []);

    const applyFilters = () => {
        if (!filters) {
            return;
        }
        const filteredUsers = initialUsers.filter(user => {
            let matchesAge = true, matchesActivities = true, matchesGender = true;
            
            // Handle age range filtering
            if (filters.age && filters.age !== "Select") {
                const ageBounds = filters.age.split('-');
                const minAge = parseInt(ageBounds[0], 10);
                const maxAge = ageBounds[1] ? parseInt(ageBounds[1], 10) : Infinity;
                matchesAge = user.age >= minAge && user.age <= maxAge;
            }
    
            // Handle activities filtering
            if (filters.activities && filters.activities.length > 0) {
                matchesActivities = filters.activities.every(activity => 
                    user.activities.includes(activity)
                );
            }
    
            // Handle gender filtering
            if (filters.gender && filters.gender !== "Select") {
                matchesGender = user.gender === filters.gender;
            }
    
            return matchesAge && matchesActivities && matchesGender;
        });
    
        setUsers(filteredUsers);
    };

    const handleUserSelection = (direction, user) => {
        setMessage(direction === 'right' ? "It's a Match!" : "Nope");
        setTimeout(() => {
            setMessage('');  // Clear the message after 1 second
            setUsers(prevUsers => prevUsers.slice(1));  // Move to the next user
        }, 1000);
    };

    return (
        <div className="discovery-page">
            {message && (
                <div className={`message ${message === "It's a Match!" ? "match-message" : "nope-message"}`}>
                    {message}
                </div>
            )}
            <div className="card-stack">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index}>
                            <ProfileCard
                                name={user.name}
                                age={user.age}
                                bio={user.bio}
                                pfp={user.pfp}
                            />
                            <button className="yes-button" onClick={() => handleUserSelection("right", user)}>Yes</button>
                            <button className="no-button" onClick={() => handleUserSelection("left", user)}>No</button>
                        </div>
                    ))
                ) : (
                    <div className="end-of-profiles-message">You have seen all possible profiles.</div>
                )}
            </div>
        </div>
    );
};

export default Cards;