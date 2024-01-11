import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // API URL - replace with your actual API URL
    const API_URL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : 'https://vguru-server.vercel.app';

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/users/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error.response);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [API_URL]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Welcome to VGuru</h1>
            {loading ? (
                <p>Loading user details...</p>
            ) : user ? (
                <div className="user-details">
                    <p>Welcome back, {user.name}!</p>
                    <p>You are a {user.role}</p>
                    <Link to='/dashboard' className="btn btn-primary m-2">Dashboard</Link>
                    <button onClick={handleLogout} className="btn btn-danger m-2">Logout</button>
                </div>
            ) : (
                <div className="login-signup-links">
                    <p>No user details found. Please log in.</p>
                    <Link to="/login" className="btn btn-primary m-2">Login</Link>
                    <Link to="/signup" className="btn btn-secondary m-2">Signup</Link>
                </div>
            )}
        </div>
    );
}

export default Home;
