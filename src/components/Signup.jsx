import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const API_URL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : 'https://vguru-server.vercel.app';
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });

    const { name, email, role, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const newUser = { name, email, role, password };
            const config = { headers: { 'Content-Type': 'application/json' } };
            const body = JSON.stringify(newUser);
            const response = await axios.post(`${API_URL}/api/users/register`, body, config);
            localStorage.setItem('token', response.data.token);
            window.location = '/';
        } catch (error) {
            console.error(error.response.data); // Handle errors
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Signup to VGuru</h2>
            <form onSubmit={e => onSubmit(e)} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" className="form-control" placeholder="Enter your name" name="name" value={name} onChange={e => onChange(e)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="Enter your email" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" id="role" className="form-control" placeholder="Role (student, mentor, teacher)" name="role" value={role} onChange={e => onChange(e)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Enter your password" name="password" value={password} onChange={e => onChange(e)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
}
