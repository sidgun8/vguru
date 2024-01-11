import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">VGuru</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome {user.name}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className=" btn btn-primary text-white" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <span onClick={() => {
                                        localStorage.removeItem('token')
                                        window.location.reload()
                                }} style={{ cursor: 'pointer' }} className=" btn btn-danger" to="/logout">Logout</span>
                                </li>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
