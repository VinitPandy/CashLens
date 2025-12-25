import React, { useState } from 'react'
import { useGlobalContext } from '../context/globalContext'

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    const inputStyle = "w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-rose-400 text-sm bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 text-center">{error}</p>}
            
            <div className="input-control">
                <input 
                    type="text" 
                    value={title} 
                    name={'title'} 
                    placeholder="Expense Title" 
                    onChange={handleInput('title')} 
                    className={inputStyle}
                />
            </div>
            
            <div className="input-control">
                <input 
                    type="number" 
                    value={amount} 
                    name={'amount'} 
                    placeholder="Amount (₹)" 
                    onChange={handleInput('amount')} 
                    className={inputStyle}
                />
            </div>
            
            <div className="input-control">
                <input 
                    type="date" 
                    value={date} 
                    name={'date'} 
                    onChange={handleInput('date')} 
                    className={`${inputStyle} text-zinc-400`} // Slightly lighter text for date placeholder feel
                />
            </div>
            
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')} className={inputStyle}>
                    <option value="" disabled>Select Category</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Add A Description' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                    className={inputStyle}
                ></textarea>
            </div>
            
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_-5px_rgba(225,29,72,0.5)] hover:shadow-[0_0_25px_-5px_rgba(225,29,72,0.7)] transition-all duration-300">
                + Add Expense
            </button>
        </form>
    )
}

export default ExpenseForm