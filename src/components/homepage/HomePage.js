import React from 'react';
import NavBar from '../nav-bar/NavBar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="content">
        {/* Content goes here */}
        <h1>Welcome to the Lunge Home Page!</h1>
      </div>
    </div>
  );
};

export default HomePage;
