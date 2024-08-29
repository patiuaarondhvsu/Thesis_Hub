import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import Header from './Header';
import Footer from './Footer';

const LoginForm = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            console.log(response.data);

            if (response.data.success) {
                if (response.data.user.role === 'admin') {
                    navigate('/logs'); // Redirect to logs page if user is an admin
                } else {
                    navigate('/main'); // Redirect to main page if user is a regular user
                }
            } else {
                setErrorMessage(response.data.message || 'Login failed');
                console.log(response.data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred during login. Please try again.');
            console.error('Login failed', error);
        }
    };

    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <div className="login-form">
                    <h2>Login</h2>
                    <p>Enter your account to continue with Thesis HUB</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <Footer />
        </div>
    );
};

export default LoginForm;
