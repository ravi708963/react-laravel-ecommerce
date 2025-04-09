import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", { email, password });
            login(res.data.token, res.data.user);
            navigate("/products");
            toast.success("Logged In Successfully.");
        } catch (err) {
            if (err.response && err.response.status === 422) {
                const responseErrors = err.response.data.errors;
                setErrors(responseErrors);

            } else {
                toast.error("Log in failed");
            }
        }
    };

    return (
        <form onSubmit={handleLogin} className="container mt-5 p-4" style={{ maxWidth: "400px", border: "2px solid cadetblue", borderRadius: "20px" }}>
            <h3 className="mb-4 text-center">Login</h3>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} type="email" value={email} onChange={e => {

                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, [e.target.name]: null }));

                }} placeholder="Email" />
                {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} type="password" name='password' value={password} onChange={e => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
                }
                }
                    placeholder="Password" />
                {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
    );
}
