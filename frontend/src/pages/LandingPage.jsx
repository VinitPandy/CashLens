import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, PieChart, ArrowRight, Wallet } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30">
      
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center text-emerald-500">
             <Wallet size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">CashLens</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-zinc-400 hover:text-white transition-colors font-medium">
            Log in
          </Link>
          <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/20 hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>
      </nav>

      <header className="flex-1 flex flex-col justify-center items-center text-center px-4 mt-10 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          v1.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent mb-6 max-w-4xl">
          Master your money with <br /> clarity and confidence.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          CashLens helps you track expenses, visualize income, and stay on top of your budgets—all in one secure dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup" className="flex items-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
            Start Tracking Free <ArrowRight size={20} />
          </Link>
          <a href="#features" className="px-8 py-4 rounded-full text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all font-semibold">
            Learn more
          </a>
        </div>
      </header>

      <section id="features" className="bg-zinc-900/30 border-t border-zinc-800/50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why choose CashLens?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingUp size={32} className="text-emerald-400" />}
              title="Real-time Tracking"
              desc="Monitor your income and expenses as they happen with dynamic charts."
            />
            <FeatureCard 
              icon={<PieChart size={32} className="text-blue-400" />}
              title="Smart Visuals"
              desc="Understand your spending habits instantly with intuitive graphs."
            />
            <FeatureCard 
              icon={<Shield size={32} className="text-purple-400" />}
              title="Secure & Private"
              desc="Your financial data is encrypted and stored securely in the cloud."
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800/50 py-10 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CashLens. Built by Vinit Pandey.</p>
      </footer>
    </div>
  );
}


function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/60 hover:border-emerald-500/20 transition-colors">
      <div className="mb-4 bg-zinc-900/50 w-16 h-16 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}