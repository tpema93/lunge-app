import React from "react";
import { useNavigate } from 'react-router-dom';
import './landing.css';

function Landing() {
    const redirect = useNavigate();
    return (
        <div className="landing">
            <nav className="landing-nav">
                <span className="landing-button" onClick={() => redirect("/login")}>Log In</span>
                <span className="landing-button" onClick={() => redirect("/signup")}>Sign Up</span>
            </nav>

            <main className="landing-body">
                <h1 className="landing-logo">Lunge.</h1>
                <p className="landing-tagline">Where fitness meets connection</p>
                <p className="about-lunge">Lunge is not a dating app; it's a fitness community. Connect with like-minded individuals who share your passion for a healthier, more active lifestyle.</p>
            </main>
        </div>
    );
};

export default Landing;
