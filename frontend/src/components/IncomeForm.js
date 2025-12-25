import React, { useState } from 'react'
import { useGlobalContext } from '../context/globalContext'

function IncomeForm() {
    const { addIncome, error, setError } = useGlobalContext()
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
        addIncome(inputState)
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
                    placeholder="Income Title" 
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
                    className={`${inputStyle} text-zinc-400`}
                />
            </div>
            
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')} className={inputStyle}>
                    <option value="" disabled >Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
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
            
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.7)] transition-all duration-300">
                + Add Income
            </button>
        </form>
    )
}

export default IncomeForm