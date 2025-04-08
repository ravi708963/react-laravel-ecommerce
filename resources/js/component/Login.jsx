import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", { email, password });
            login(res.data.token, res.data.user);
            navigate("/products");
            toast.success("Logged In Successfully.");
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin} className="container mt-5 p-4" style={{ maxWidth: "400px", border: "2px solid cadetblue", borderRadius: "20px" }}>
            <h3 className="mb-4 text-center">Login</h3>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input className='form-control' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className='form-control' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            {error && <p>{error}</p>}
        </form>
    );
}
