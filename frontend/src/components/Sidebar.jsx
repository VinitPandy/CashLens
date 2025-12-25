import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, TrendingDown, Wallet,IndianRupee } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const nav = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Incomes", icon: TrendingUp, path: "/incomes" },
    { name: "Expenses", icon: TrendingDown, path: "/expenses" },
    { name: "Budgets", icon: Wallet, path: "/budgets" },
  ];

  const activeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  const inactiveClass = "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-transparent";

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-zinc-800/60 bg-zinc-950/70 backdrop-blur p-4 gap-4">
      
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 grid place-items-center text-emerald-400">
          <IndianRupee size={20} strokeWidth={2.5} />
        </div>
        <div className="text-zinc-100 font-semibold text-xl">CashLens</div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        {nav.map((n) => {
          const isActive = location.pathname === n.path;
          const Icon = n.icon; 
          
          return (
            <Link 
              key={n.name} 
              to={n.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-200 ${isActive ? activeClass : inactiveClass}`}
            >
              {/* Render the Icon Component */}
              <Icon size={20} />
              <span className="font-medium">{n.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="mt-auto text-xs text-zinc-500">v1.0 • Connected</div>
    </aside>
  );
}