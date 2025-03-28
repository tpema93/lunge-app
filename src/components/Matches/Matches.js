import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Matches.css';

const MatchesPage = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/matches.php');
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    setMatches(data.matches);
                }
            } catch (error) {
                setError('An error occurred during the fetch operation');
            }
        };

        fetchMatches();
    }, []);

    // Update the function to use first and last name or a unique identifier
    const redirectToChat = (firstName, lastName) => {
        // Placeholder for navigating to the chat with the matched user
        // Adjust the navigate path as needed.
        navigate(`/chat-with/${firstName}-${lastName}`);
    };

    return (
        <div className="matches-container">
            <h1 className='matches-h1'>Matches</h1>
            {error && <p className="matches-error">{error}</p>}
            <ul className='matches-ul'>
                {matches.map((match, index) => (
                    // Updated the click handler and content to display names
                    <li className="matches-li" key={index} onClick={() => navigate("/chat")}>
                        <span>{match.first_name} {match.last_name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchesPage;
