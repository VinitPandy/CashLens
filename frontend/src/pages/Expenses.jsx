import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/globalContext'
import ExpenseForm from '../components/ExpenseForm'
import { 
    Trash2, 
    TrendingDown, 
    Calendar, 
    CircleDollarSign, 
    BookOpen, 
    ShoppingCart, 
    HeartPulse, 
    Tv, 
    Utensils, 
    Shirt, 
    Car, 
    IndianRupee 
} from 'lucide-react';

// Helper to Format Date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
}

// Helper: Get Icon based on Category
const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
        case 'education': return <BookOpen size={24} />;
        case 'groceries': return <ShoppingCart size={24} />;
        case 'health': return <HeartPulse size={24} />;
        case 'subscriptions': return <Tv size={24} />;
        case 'takeaways': return <Utensils size={24} />;
        case 'clothing': return <Shirt size={24} />;
        case 'travelling': return <Car size={24} />;
        case 'other': return <CircleDollarSign size={24} />;
        default: return <CircleDollarSign size={24} />;
    }
}

function Expenses() {
    const { expenses, getExpenses, totalExpense, deleteExpense } = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 text-white">
            <h1 className="text-3xl font-bold mb-6 text-zinc-100">Expenses</h1>

            {/* Total Expense Header */}
            <div className="bg-zinc-950/70 border border-zinc-800/60 p-6 rounded-2xl mb-8 flex items-center justify-between shadow-[0_0_30px_-10px_rgba(225,29,72,0.2)]">
                <div>
                    <h2 className="text-zinc-400 font-medium">Total Spending</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <IndianRupee size={32} className="text-rose-500" />
                        <p className="text-4xl font-bold text-rose-500">{totalExpense()}</p>
                    </div>
                </div>
                <div className="h-14 w-14 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400 shadow-[0_0_15px_-5px_rgba(225,29,72,0.5)]">
                    <TrendingDown size={30} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Form */}
                <div className="lg:col-span-1 h-fit">
                    <div className="bg-zinc-950/70 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur">
                        <h3 className="text-xl font-semibold mb-4 text-zinc-200">New Transaction</h3>
                        <ExpenseForm />
                    </div>
                </div>
                
                {/* Right Side: List */}
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-zinc-200">Transaction History</h3>
                    <div className="flex flex-col gap-3">
                        {expenses.length === 0 && <p className="text-zinc-500 text-center py-10">No expenses recorded yet.</p>}
                        
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description} = expense;
                            return (
                                <div key={_id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-rose-500/30 hover:bg-zinc-900 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                            {getCategoryIcon(category)}
                                        </div>
                                        <div>
                                            <h5 className="text-zinc-100 font-medium text-lg">{title}</h5>
                                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                                <Calendar size={14} />
                                                <span>{formatDate(date)}</span>
                                                <span>•</span>
                                                <span className="capitalize">{category}</span>
                                            </div>
                                            <p className="text-xs text-zinc-600 mt-1">{description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 text-rose-400 font-bold text-lg">
                                            <span>-</span>
                                            <IndianRupee size={16} />
                                            <p>{amount}</p>
                                        </div>
                                        <button 
                                            onClick={() => deleteExpense(_id)}
                                            className="p-2 rounded-full bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-500 transition-colors mt-2"
                                            title="Delete Transaction"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expenses