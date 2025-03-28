import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';


const Signup = ({setLoggedIn}) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    const getSessionInfo = async () => {
        const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/getUserInfo.php');
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
    };

    const handleSignup = async () => {
        // Validate fields
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setSignupMessage('Please fill out all fields.');
            return;
        }


        // Check if passwords match
        if (password !== confirmPassword) {
            setSignupMessage('Passwords do not match.');
            return;
        }


        try {
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('email', email);
            formData.append('password', password);


            const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/signup.php', {
                method: 'POST',
                body: formData,
            });


            const data = await response.json();


            if (data.status === 'success') {
                alert(`${firstName} ${lastName} has successfully signed up.`);
                setLoggedIn(true);
                getSessionInfo();
                navigate('/new-profile');
            } else {
                setSignupMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setSignupMessage('An error occurred during signup.');
            console.error('Error:', error);
        }
    };


    return (
        <div className="signup-body">
            <div className="signup-form-container">
                <h1 className='signup-h1'>Sign Up</h1>
                <input className="signup-text-input" required type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input className="signup-text-input" required type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input className="signup-text-input" required type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="signup-text-password" required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="signup-text-password" required type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className="signup-buttons" onClick={handleSignup}>Next</button>
                <p className='signup-login-redirect'>Already have an account? <Link to="/login"> Log in</Link></p>
                {signupMessage && <p className='signup-p'>{signupMessage}</p>}
            </div>
        </div>
    );
};


export default Signup;