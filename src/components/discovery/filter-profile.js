import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './filter-profile.css';

const activitiesOptions = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Golf', 'Swimming', 'Volleyball', 'Cycling', 'Running', 'Badminton', 'Weightlifting', 'Hiking', 'Yoga', 'Boxing', 'Skateboarding', 'Skiing', 'Snowboarding', 'Crossfit', 'Gymnastics', 'Surfing'];
const ageRanges = ["Select", "18-25", "25-35", "35-45", "45-55", "55-65", "65-75", "75 and up"];


const FilterProfile = () => {
  const [filters, setFilters] = useState({
    age: '',
    gender: '',
    activities: []
  });

  const navigate = useNavigate(); // Hook to navigate to other routes

  // Handles form input changes
  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "activities") {
      // Toggle selection for activities
      const newActivities = filters.activities.includes(value)
        ? filters.activities.filter(activity => activity !== value)
        : [...filters.activities, value];
      setFilters({ ...filters, activities: newActivities });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  // Handles the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you might want to do something with the filters,
    // like storing them in a global state or passing them to the API for filtering
    
    console.log(filters);
    // Pass filters as state when navigating
    navigate("/discovery", { state: { filters } });
  };

  return (
    <div className="filter-profile-body">
      <div className="filter-form-container">
        <form onSubmit={handleSubmit} className="filter-form">
          <div className="filter-input-container">
            <label>
              Age Range:
              <select name="age" value={filters.age} onChange={handleChange}>
                {ageRanges.map(range => (
                  <option key={range} value={range === "Select" ? "" : range}>{range}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="filter-input-container">
            <label>
              Gender:
              <select name="gender" value={filters.gender} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="filter-input-container activities-container">
            <label>Activities:</label>
            <div className="activities-checkboxes">
              {activitiesOptions.map(activity => (
                <div key={activity} className="activity-option">
                  <input
                    type="checkbox"
                    name="activities"
                    value={activity}
                    id={`activity-${activity}`}
                    checked={filters.activities.includes(activity)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`activity-${activity}`}>{activity}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="filter-apply-button">Apply Filters</button>
        </form>
        <button onClick={() => navigate("/discovery")} className="filter-go-back-button">Go Back</button>
      </div>
    </div>
  );
};

export default FilterProfile;