import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/register', form);

            navigate("/login");
            toast.success("User Registered successfully");

        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister} className="container mt-5 p-4" style={{ maxWidth: "400px", border: "2px solid cadetblue", borderRadius: "20px" }}>
            <h3 className="mb-4 text-center">Register</h3>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className="form-control" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-success w-100">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
}
