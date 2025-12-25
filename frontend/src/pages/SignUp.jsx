import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

function Signup() {
    const navigate = useNavigate();
    const { signup, error } = useGlobalContext();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup(formData.username, formData.email, formData.password);
        if (success) {
            navigate('/login'); // Redirect to login after signup
        }
    };

    const inputStyle = "w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all";

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md bg-zinc-950/70 border border-zinc-800/60 p-8 rounded-2xl shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] backdrop-blur">
                <h2 className="text-3xl font-bold text-center text-zinc-100 mb-2">Create Account</h2>
                <p className="text-zinc-500 text-center mb-8">Start tracking your money today</p>

                {error && <p className="text-rose-400 text-sm bg-rose-500/10 p-2 rounded mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="text" name="username" placeholder="Full Name" 
                        onChange={handleChange} className={inputStyle} required 
                    />
                    <input 
                        type="email" name="email" placeholder="Email Address" 
                        onChange={handleChange} className={inputStyle} required 
                    />
                    <input 
                        type="password" name="password" placeholder="Password" 
                        onChange={handleChange} className={inputStyle} required 
                    />
                    
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all duration-300 mt-2">
                        Sign Up
                    </button>
                </form>

                <p className="text-zinc-500 text-center mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;