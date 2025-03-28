import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [discoveryMode, setDiscoveryMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const mode = localStorage.getItem('discoveryMode');
    setDiscoveryMode(mode === 'true');
    // Fetch user's first name on component mount
    fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/getUserInfo.php') // Adjust the path as necessary
      .then(response => response.json())
      .then(data => setFirstName(data.firstName))
      .catch(error => console.error('Error fetching first name:', error));
  }, []); // Empty dependency array ensures this runs once on mount

  const handleLogout = () => {
    setShowPopup(true);
    
    // navigate to login page after showing the popup and waiting for a bit
    setTimeout(() => {
      setShowPopup(false);
      navigate('/');
    }, 1500); // Waits for 1.5 seconds before navigating
  };


  // Toggle discovery mode and save to local storage
  const toggleDiscoveryMode = () => {
    const newMode = !discoveryMode;
    const userConfirmation = window.confirm(`Are you sure you want to turn discovery ${newMode ? 'on' : 'off'}?`);
    if (userConfirmation) {
      setDiscoveryMode(newMode);
      localStorage.setItem('discoveryMode', newMode.toString());
    }
  };

  return (
    <div className="navbar">
      <Link to="/discovery">Discovery</Link>
      <Link to="/filter">Filter</Link>
      <Link to="/matches">Matches</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/edit-profile">Edit Profile </Link>
      {firstName && <span className="navbar-greeting">Hello, {firstName}</span>}
      <button onClick={toggleDiscoveryMode} className="discovery-mode-toggle">
        {discoveryMode ? 'Discovery On' : 'Discovery Off'}
      </button>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
      
      {showPopup && <div className="logout-popup">You are now logging out</div>}
    </div>
  );
};

export default NavBar;
