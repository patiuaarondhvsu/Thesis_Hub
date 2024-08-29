import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import Header from './Header';
import Footer from './Footer';

const LoginForm = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // State for handling error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');  // Debugging: Log when form is submitted

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            }, {
                withCredentials: true // Ensure cookies are sent with the request if needed
            });

            console.log(response.data);  // Debugging: Log the server response

            if (response.data.success) {
                // Debugging: Confirm navigation
                console.log('Login successful, navigating to main page');
                navigate('/main');
            } else {
                // Set the error message to display on the UI
                setErrorMessage(response.data.message || 'Login failed');
                console.log(response.data.message);  // Debugging: Log the error message
            }
        } catch (error) {
            setErrorMessage('An error occurred during login. Please try again.');
            console.error('Login failed', error);
        }
    };

    return (
        <div className="App">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="main-content">
                <div className="login-form">
                    <h2>Login</h2>
                    <p>Enter your account to continue with Thesis HUB</p>

                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account?{' '}
                        <span onClick={onSwitchToRegister} className="switch-link">Register</span>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LoginForm;
