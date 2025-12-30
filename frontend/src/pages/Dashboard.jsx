import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, Legend
} from "recharts";
import StatCard from "../components/statcard";
import { 
    Wallet, TrendingUp, TrendingDown, IndianRupee, 
    ShoppingCart, Utensils, BookOpen, HeartPulse, 
    Tv, Shirt, Car, Briefcase, CircleDollarSign, 
    Sparkles, Loader
} from 'lucide-react';

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
}

const getCategoryIcon = (category) => {
    if (!category) return <CircleDollarSign size={20} />;
    switch (category.toLowerCase()) {
        case 'groceries': return <ShoppingCart size={20} />;
        case 'takeaways': return <Utensils size={20} />;
        case 'education': return <BookOpen size={20} />;
        case 'health': return <HeartPulse size={20} />;
        case 'subscriptions': return <Tv size={20} />;
        case 'clothing': return <Shirt size={20} />;
        case 'travelling': return <Car size={20} />;
        case 'salary': return <Briefcase size={20} />;
        default: return <CircleDollarSign size={20} />;
    }
}


const Typewriter = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length - 1) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default function Dashboard() {
  const { getIncomes, getExpenses, incomes, expenses, aiAdvice, getAdvice, aiLoading } = useGlobalContext();
  const [timeRange, setTimeRange] = useState('all'); 

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const filterByDate = (data) => {
    if (timeRange === 'all') return data;
    const now = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(now.getDate() - parseInt(timeRange));
    return data.filter(item => new Date(item.date) >= daysAgo);
  }

  // Apply filter
  const filteredIncomes = filterByDate(incomes);
  const filteredExpenses = filterByDate(expenses);

  // Calculations
  const currentIncome = filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0);
  const currentExpense = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = currentIncome - currentExpense;

  // Chart Data
  const trendData = filteredExpenses.slice(0, 6).map(exp => ({
      label: formatDate(exp.date),
      amount: exp.amount
  })).reverse();

  const categoryMap = {};
  filteredExpenses.forEach(exp => {
      if(exp.category) categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
  });
  const categoryData = Object.keys(categoryMap).map(key => ({
      name: key,
      value: categoryMap[key]
  }));

  const recentHistory = [...filteredExpenses].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const neon = "shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] transition-all duration-300";

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-white">
      
      {/* HEADER: Spans full width */}
      <div className="col-span-full flex justify-between items-center mb-2">
         <h2 className="text-2xl font-bold text-zinc-100">Dashboard</h2>
         <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
         >
            <option value="all">All Time</option>
            <option value="30">Last 30 Days</option>
            <option value="7">Last 7 Days</option>
         </select>
      </div>

      {/* STAT CARDS: 3 cards fit perfectly in 3 columns */}
      <StatCard label="Balance" value={currentBalance} sub="In selected period">
        <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
            <Wallet size={20} />
        </div>
      </StatCard>
      
      <StatCard label="Income" value={currentIncome} sub="In selected period">
        <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
            <TrendingUp size={20} />
        </div>
      </StatCard>
      
      <StatCard label="Expenses" value={currentExpense} sub="In selected period">
         <div className="h-10 w-10 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400">
            <TrendingDown size={20} />
        </div>
      </StatCard>
      
      <div className="col-span-full bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-purple-900/10">
          
          {/* Icon & Text Area */}
          <div className="flex items-start gap-4 w-full md:w-3/4">
              <div className="p-3 bg-purple-500/20 rounded-full text-purple-400 shrink-0">
                  {aiLoading ? (
                    <Loader className="animate-spin" size={24} />
                  ) : (
                    <Sparkles size={24} />
                  )}
              </div>
              <div className="w-full">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    AI Financial Insight
                    {aiLoading && <span className="text-xs font-normal text-purple-400 animate-pulse">(Analyzing...)</span>}
                  </h3>
                  
                  <div className="text-zinc-400 min-h-[3rem] text-sm md:text-base leading-relaxed">
                      {aiLoading ? (
                        <div className="space-y-2 animate-pulse">
                          <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                        </div>
                      ) : aiAdvice ? (
                        <div className="text-zinc-200 italic border-l-2 border-purple-500 pl-3">
                           
                           <Typewriter text={aiAdvice} />
                        </div>
                      ) : (
                        "Tap the button to analyze your spending habits and get personalized advice."
                      )}
                  </div>
              </div>
          </div>

          {/* Button Area */}
          <button 
              type="button"
              onClick={getAdvice}
              disabled={aiLoading}
              className={`
                w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white 
                flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300
                ${aiLoading 
                  ? 'bg-zinc-800 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5'
                }
              `}
          >
              {aiLoading ? <Loader className="animate-spin" size={20} /> : <Sparkles size={20} />}
              <span>{aiLoading ? "Thinking..." : aiAdvice ? "Get New Advice" : "Ask AI Advisor"}</span>
          </button>
      </div>

      {/* 3. LEFT COLUMN: Main Chart (Spans 2 columns on large screens) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className={`xl:col-span-2 rounded-2xl border border-zinc-800/60 p-4 md:p-5 bg-zinc-950/70 backdrop-blur ${neon}`}
      >
        <h3 className="text-zinc-100 font-semibold">Spending Timeline</h3>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="label" stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12, color: '#fff' }} />
              <Line type="monotone" dataKey="amount" stroke="#34d399" strokeWidth={3} dot={{r: 4, fill:'#34d399'}} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 4. RIGHT COLUMN: Stacked Pie Chart & History (Spans 1 column) */}
      <div className="flex flex-col gap-6">
          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`flex-1 rounded-2xl border border-zinc-800/60 p-4 md:p-5 bg-zinc-950/70 backdrop-blur ${neon}`}>
            <h3 className="text-zinc-100 font-semibold">Category Split</h3>
            <div className="h-48 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={40} paddingAngle={5}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#34d399", "#60a5fa", "#f59e0b", "#f43f5e", "#a78bfa"][index % 5]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`flex-1 rounded-2xl border border-zinc-800/60 p-4 md:p-5 bg-zinc-950/70 backdrop-blur ${neon}`}>
            <h3 className="text-zinc-100 font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
              {recentHistory.length === 0 ? <p className="text-zinc-500 text-sm">No transactions yet.</p> : recentHistory.map((tx) => (
                <div key={tx._id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                      <div className="text-zinc-100 font-medium text-sm">{tx.title}</div>
                      <div className="text-xs text-zinc-500">{formatDate(tx.date)}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-rose-400 text-sm">
                    - ₹{tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
      </div>

    </main>
  );
}