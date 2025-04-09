import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/register', form);

            navigate("/login");
            toast.success("User Registered successfully");

        } catch (err) {
            if (err.response && err.response.status === 422) {
                const responseErrors = err.response.data.errors;
                setErrors(responseErrors);

            } else {
                toast.error("Registration failed");
            }

        }
    };

    return (
        <form onSubmit={handleRegister} className="container mt-5 p-4" style={{ maxWidth: "400px", border: "2px solid cadetblue", borderRadius: "20px" }}>
            <h3 className="mb-4 text-center">Register</h3>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}

            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
                {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}

            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
                {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}

            </div>
            <button type="submit" className="btn btn-success w-100">Register</button>

        </form>
    );
}
