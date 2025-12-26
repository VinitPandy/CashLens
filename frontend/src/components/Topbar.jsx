import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut , Menu } from 'lucide-react';

// Accept the toggleSidebar prop from App.js
function Topbar({ toggleSidebar }) {
    const { user, logout } = useGlobalContext();
    const navigate = useNavigate();

    const date = new Date().toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="flex justify-between items-center p-4 px-6 mb-4 sticky top-0 z-10 bg-zinc-950/30 backdrop-blur-sm border-b border-zinc-800/50">
            
            <div className="flex items-center gap-4">
                {/* 1. Hamburger Button (Only visible on mobile) */}
                <button 
                    onClick={toggleSidebar} 
                    className="md:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                    <Menu size={20} />
                </button>

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        Welcome back, {user ? user.username : 'User'}! 
                    </h2>
                    <p className="text-xs text-zinc-500">{date}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 hover:border-emerald-500/30 transition-colors">
                    <Search className="text-zinc-500 mr-2" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-transparent text-sm text-zinc-300 focus:outline-none w-32 lg:w-48 placeholder-zinc-600"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_15px_-5px_rgba(16,185,129,0.5)]">
                        {user && user.username ? user.username[0].toUpperCase() : 'U'}
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-rose-400 transition-colors border border-zinc-800 px-3 py-2 rounded-xl hover:border-rose-500/30 bg-zinc-900"
                    >
                        <LogOut size={14} />
                        <span className="hidden md:block">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Topbar;