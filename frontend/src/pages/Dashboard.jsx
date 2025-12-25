import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, Legend
} from "recharts";
import StatCard from "../components/statcard";
import { 
    Wallet, 
    TrendingUp, 
    TrendingDown, 
    Brain, 
    IndianRupee, 
    ShoppingCart, 
    Utensils, 
    BookOpen, 
    HeartPulse, 
    Tv, 
    Shirt, 
    Car, 
    Briefcase,
    CircleDollarSign 
} from 'lucide-react';

// Helper to Format Date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
}

// Helper: Get Icon based on Category (Matches Expenses/Incomes)
const getCategoryIcon = (category) => {
    // Safety check if category is undefined
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

export default function Dashboard() {
  const { getIncomes, getExpenses, incomes, expenses } = useGlobalContext();
  
  // 1. New State for Time Filter
  const [timeRange, setTimeRange] = useState('all'); // 'all', '30', '7'
  const [insight, setInsight] = useState({ message: "Analyzing...", status: "neutral" });

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  // 2. Filter Logic
  const filterByDate = (data) => {
    if (timeRange === 'all') return data;
    
    const now = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(now.getDate() - parseInt(timeRange));

    return data.filter(item => new Date(item.date) >= daysAgo);
  }

  // Apply filter to data
  const filteredIncomes = filterByDate(incomes);
  const filteredExpenses = filterByDate(expenses);

  // 3. Dynamic Calculations based on Filtered Data
  const currentIncome = filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0);
  const currentExpense = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = currentIncome - currentExpense;

  // --- AI INSIGHT ALGORITHM (Updated to use filtered data) ---
  useEffect(() => {
    if(filteredIncomes.length > 0 || filteredExpenses.length > 0) {
        generateAIInsights();
    }
  }, [currentIncome, currentExpense, timeRange]);

  const generateAIInsights = () => {
    // 1. DANGER: Spending > Income
    if (currentExpense > currentIncome && currentIncome > 0) {
        setInsight({ message: "Critical: Spending exceeds income in this period!", status: "danger" });
        return;
    }
    
    // 2. WARNING: High Usage
    const usageRatio = (currentExpense / currentIncome) * 100;
    if (usageRatio > 80) {
        setInsight({ message: `Warning: You used ${Math.round(usageRatio)}% of income recently.`, status: "warning" });
        return;
    }

    // 3. Category Check
    if (filteredExpenses.length > 0) {
        const categoryTotals = {};
        filteredExpenses.forEach(exp => {
            // Safety check for category
            if(exp.category) {
                categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
            }
        });
        
        const categories = Object.keys(categoryTotals);
        if(categories.length > 0) {
            const biggestCategory = categories.reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);
            if (categoryTotals[biggestCategory] > (currentExpense * 0.4)) {
                setInsight({ message: `Alert: ${biggestCategory} is ${Math.round((categoryTotals[biggestCategory]/currentExpense)*100)}% of your spending.`, status: "warning" });
                return;
            }
        }
    }

    setInsight({ message: "Finances look stable for this period.", status: "success" });
  };

  // --- CHART DATA PREP ---
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
    <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 text-white">
      
      {/* HEADER WITH FILTER */}
      <div className="xl:col-span-4 flex justify-between items-center mb-2">
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

      {/* STAT CARDS */}
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
      
      {/* AI INSIGHT */}
      <div className={`rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/70 backdrop-blur transition-all duration-300 ${
          insight.status === 'danger' ? 'shadow-[0_0_20px_-5px_rgba(244,63,94,0.5)] border-rose-500/30' : 
          insight.status === 'warning' ? 'shadow-[0_0_20px_-5px_rgba(250,204,21,0.5)] border-yellow-500/30' : 
          'shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)] border-emerald-500/30'
      }`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-zinc-400 text-sm font-medium">AI Insight</p>
                <h3 className={`text-lg font-bold mt-1 ${
                    insight.status === 'danger' ? 'text-rose-400' : 
                    insight.status === 'warning' ? 'text-yellow-400' : 'text-emerald-400'
                }`}>
                    {insight.status === 'danger' ? 'Critical' : insight.status === 'warning' ? 'Warning' : 'Healthy'}
                </h3>
            </div>
            <Brain size={24} className="text-zinc-400" />
        </div>
        <div className="mt-4 text-xs text-zinc-300 font-medium">{insight.message}</div>
      </div>

      {/* CHARTS */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`xl:col-span-2 rounded-2xl border border-zinc-800/60 p-4 md:p-5 bg-zinc-950/70 backdrop-blur ${neon}`}>
        <h3 className="text-zinc-100 font-semibold">Spending Timeline</h3>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="label" stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12, color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#34d399" strokeWidth={3} dot={{r: 4, fill:'#34d399'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`rounded-2xl border border-zinc-800/60 p-4 md:p-5 bg-zinc-950/70 backdrop-blur ${neon}`}>
        <h3 className="text-zinc-100 font-semibold">Category Split</h3>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={5}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#34d399", "#60a5fa", "#f59e0b", "#f43f5e", "#a78bfa"][index % 5]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* RECENT TRANSACTIONS */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`rounded-2xl border border-zinc-800/60 p-4 md:p-5 bg-zinc-950/70 backdrop-blur ${neon}`}>
        <h3 className="text-zinc-100 font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
          {recentHistory.length === 0 ? <p className="text-zinc-500 text-sm">No transactions in this period.</p> : recentHistory.map((tx) => (
            <div key={tx._id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  {getCategoryIcon(tx.category)}
                </div>
                <div>
                  <div className="text-zinc-100 font-medium text-sm">{tx.title}</div>
                  <div className="text-xs text-zinc-500">{formatDate(tx.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 font-semibold text-rose-400">
                <span>-</span>
                <IndianRupee size={14} />
                <span>{tx.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}