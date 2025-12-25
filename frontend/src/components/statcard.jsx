import React from 'react';

export default function StatCard({ label, value, sub, children }) {
    return (
        <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/70 backdrop-blur shadow-[0_0_30px_-10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-zinc-400 text-sm font-medium">{label}</p>
                    <h3 className="text-2xl font-bold text-zinc-100 mt-1">{value}</h3>
                </div>
                {children}
            </div>
            <div className="mt-4 text-xs text-zinc-500 font-medium">
                {sub}
            </div>
        </div>
    )
}