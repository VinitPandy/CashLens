import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/globalContext'
import { 
    Trash2, 
    Wallet, 
    ShoppingCart, 
    Utensils, 
    Shirt, 
    Car, 
    CircleDollarSign,
    Target
} from 'lucide-react';

// Helper: Get Icon based on Category
const getCategoryIcon = (category) => {
    if (!category) return <CircleDollarSign size={20} />;

    switch (category.toLowerCase()) {
        case 'groceries': return <ShoppingCart size={20} />;
        case 'takeaways': return <Utensils size={20} />;
        case 'clothing': return <Shirt size={20} />;
        case 'travelling': return <Car size={20} />;
        case 'other': return <CircleDollarSign size={20} />;
        default: return <CircleDollarSign size={20} />;
    }
}

function Budget() {
    const { budgets, getBudgets, addBudget, deleteBudget, expenses, getExpenses } = useGlobalContext()
    
    // Local state for the form
    const [formData, setFormData] = useState({ category: '', limit: '' })

    useEffect(() =>{
        getBudgets()
        getExpenses()
    }, [])

    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addBudget(formData)
        setFormData({ category: '', limit: '' })
    }

    // --- CALCULATE PROGRESS ---
    const getProgress = (category, limit) => {
        // SAFETY CHECK 1: If the Budget itself has no category name, stop immediately.
        if (!category) return { totalSpent: 0, percent: 0 };

        // 1. Find all expenses that match this budget category
        const categoryExpenses = expenses.filter(exp => 
            // SAFETY CHECK 2: Only compare if expense has a category
            exp.category && exp.category.toLowerCase() === category.toLowerCase()
        );
        
        // 2. Sum them up
        const totalSpent = categoryExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        
        // 3. Calculate percentage
        const percent = Math.min(100, Math.round((totalSpent / limit) * 100));
        
        return { totalSpent, percent };
    }

    const inputStyle = "w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all";

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Target size={28} />
                </div>
                <h1 className="text-3xl font-bold text-zinc-100">Smart Budgets</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- LEFT: SET BUDGET FORM --- */}
                <div className="lg:col-span-1 h-fit">
                    <div className="bg-zinc-950/70 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]">
                        <div className="flex items-center gap-2 mb-4">
                            <Wallet size={20} className="text-zinc-400" />
                            <h3 className="text-xl font-semibold text-zinc-200">Set Monthly Limit</h3>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <select required name="category" value={formData.category} onChange={handleInput} className={inputStyle}>
                                <option value="" disabled>Select Category</option>
                                <option value="groceries">Groceries</option>
                                <option value="takeaways">Takeaways</option>
                                <option value="clothing">Clothing</option>
                                <option value="travelling">Travelling</option>
                                <option value="other">Other</option>
                            </select>
                            
                            <input 
                                type="number" 
                                name="limit" 
                                value={formData.limit} 
                                placeholder="Limit Amount (₹)" 
                                onChange={handleInput} 
                                className={inputStyle}
                            />
                            
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2">
                                <span>+</span> Set Budget
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- RIGHT: BUDGET CARDS --- */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {budgets.length === 0 && (
                        <div className="col-span-2 flex flex-col items-center justify-center py-10 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                            <Target size={40} className="mb-3 opacity-20" />
                            <p>No budgets set. Create one to track your spending!</p>
                        </div>
                    )}
                    
                    {budgets.map((budget) => {
                        const { totalSpent, percent } = getProgress(budget.category, budget.limit);
                        
                        // Dynamic Color: Green (<50%), Yellow (50-80%), Red (>80%)
                        let statusColor = "bg-emerald-500";
                        if(percent > 50) statusColor = "bg-yellow-500";
                        if(percent > 80) statusColor = "bg-rose-500";

                        return (
                            <div key={budget._id} className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all group">
                                <button 
                                    onClick={() => deleteBudget(budget._id)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-500/10 text-zinc-600 hover:text-rose-500 transition-colors"
                                    title="Delete Budget"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="flex justify-between items-end mb-4 pr-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            {getCategoryIcon(budget.category)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold capitalize text-zinc-200">{budget.category}</h3>
                                            <p className="text-sm text-zinc-500">Limit: ₹{budget.limit}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xl font-bold ${percent > 100 ? 'text-rose-500' : 'text-zinc-100'}`}>
                                            {percent}%
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar Background */}
                                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    {/* Actual Progress */}
                                    <div 
                                        className={`h-full ${statusColor} shadow-[0_0_15px_-2px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-out`} 
                                        style={{width: `${Math.min(percent, 100)}%`}}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between items-center mt-3 text-xs">
                                    <span className={percent > 100 ? "text-rose-400 font-medium" : "text-zinc-500"}>
                                        {percent > 100 ? "Over Budget!" : "On Track"}
                                    </span>
                                    <span className="text-zinc-500">
                                        Spent: <span className="text-zinc-300">₹{totalSpent}</span>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Budget