import React, { useState } from 'react';
import './ChooseActivities.css';
import  {useNavigate} from 'react-router-dom';
function ChooseActivities() {
    const navigate = useNavigate();
    // Search bar query
    const [searchQuery, setSearchQuery] = useState('');
    // Saves the selected activities
    const [selectedActivities, setSelectedActivities] = useState([]);
    const activities = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Golf', 'Swimming', 'Volleyball', 'Cycling', 'Running', 'Badminton', 'Weightlifting','Hiking','Yoga','Boxing','Skateboarding','Skiing','Snowboarding','Crossfit','Gymnastics','Surfing'];

    // Handler for input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Toggle activity selection
    const toggleActivity = (activity) => {
        setSelectedActivities(prevActivities => {
            const isAlreadySelected = prevActivities.includes(activity);
            if (isAlreadySelected) {
                return prevActivities.filter(currentActivity => currentActivity !== activity);
            } else {
                return prevActivities.length < 3 ? [...prevActivities, activity] : prevActivities;
            }
        });
    };

    const filteredActivities = activities.filter(activity => activity.toLowerCase().includes(searchQuery.toLowerCase()));

    // Handle Enter press in the search bar
    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission behavior
            const matchedActivity = activities.find(activity => activity.toLowerCase() === searchQuery.toLowerCase());
            if (matchedActivity && !selectedActivities.includes(matchedActivity)) {
                setSelectedActivities(prevActivities => [...prevActivities, matchedActivity]);
            }
            setSearchQuery(''); // Clear the search field after adding
        }
    };

    // Placeholder function for Next button
    const handleNextClick = () => {
        navigate('/discovery')
    };

    return (
        <div className="choose-activities">
            <header className="activitiesHeader">
                <h1>Choose up to 3 Activities</h1>
            </header>
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleEnterPress}
                className="search-bar"
            />
            {searchQuery && filteredActivities.length > 0 ? (
                <ul className="activities-list">
                    {filteredActivities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            ) : searchQuery && filteredActivities.length === 0 ? (
                <p>No activities found.</p>
            ) : null}
            <div className="activities-buttons">
                {activities.map((activity, index) => (
                    <button
                        key={index}
                        className={`activity-button ${selectedActivities.includes(activity) ? 'selected' : ''}`}
                        onClick={() => toggleActivity(activity)}
                    >
                        {activity}
                    </button>
                ))}
            </div>

            <button onClick={handleNextClick} className="next-button">Next</button>
        </div>
    );
}

export default ChooseActivities;