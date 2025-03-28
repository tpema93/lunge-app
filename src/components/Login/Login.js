import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';


const Login = ({setLoggedIn}) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Use the useNavigate hook

    const getSessionInfo = async () => {
        const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/getUserInfo.php');
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/login.php', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            switch (data.status) {
                case 'success':
                    setMessage('Log in successful');
                    setLoggedIn(true);
                    getSessionInfo();
                    navigate('/discovery');
                    break;
                case 'user_not_found':
                    setMessage('No account associated with this email');
                    break;
                case 'incorrect_password':
                    setMessage('Incorrect password');
                    break;
                default:
                    setMessage('Log in failed: ' + data.message);
                    break;
            }
        } catch (error) {
            setMessage('Error: ' + error);
        }
    };

    const handleClosePopup = () => {
        setMessage(''); // Clear the message to close the popup
    };

    const handleSignupRedirect = () => {
        navigate('/discovery'); // redirect to the discovery page
    };

    return (
        <div className='login-body'>
            <div className="login-form-container">
                <h1 className='login-h1'>Log in to Lunge</h1>
                <input
                    className="login-text-input"
                    type="email"
                    required 
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-text-password"
                    type="password" 
                    requires
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-buttons" onClick={handleSubmit}>Log In</button>
                <p className='login-signup-redirect'>Don't have an account? <Link to="/signup"> Sign up</Link>
                </p>
                {message && (
                    <div className="login-popup">
                        <p className='login-p'>{message}</p>
                        <button className="login-popup-close" onClick={handleClosePopup}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;


