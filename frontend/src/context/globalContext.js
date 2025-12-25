import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "https://cashlens-raiu.onrender.com/api/v1";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null); 
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [budgets, setBudgets] = useState([])
    const [error, setError] = useState(null)


    const login = async (email, password) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); // <--- CHANGED
            
            setToken(res.data.token);
            setUser(res.data.user);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed");
            return false;
        }
    }

    const signup = async (username, email, password) => {
        try {
            await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Signup Failed");
            return false;
        }
    }

    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setToken(null);
        setUser(null);
        setIncomes([]);
        setExpenses([]);
        setBudgets([]);
    }

    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

   
    const handleRequestError = (err) => {
        if (err.response && err.response.status === 401) {
            logout();
        }
        setError(err.response?.data?.message || "Error");
    }

    const getIncomes = async () => {
        if(!token) return;
        try {
            const response = await axios.get(`${BASE_URL}/get-incomes`, config)
            setIncomes(response.data)
        } catch (err) {
            handleRequestError(err);
        }
    }

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}/add-income`, income, config)
            getIncomes()
        } catch (err) {
            handleRequestError(err);
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-income/${id}`, config)
            getIncomes()
        } catch (err) {
            handleRequestError(err);
        }
    }

    const getExpenses = async () => {
        if(!token) return;
        try {
            const response = await axios.get(`${BASE_URL}/get-expenses`, config)
            setExpenses(response.data)
        } catch (err) {
            handleRequestError(err);
        }
    }

    const addExpense = async (income) => {
        try {
            await axios.post(`${BASE_URL}/add-expense`, income, config)
            getExpenses()
        } catch (err) {
            handleRequestError(err);
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-expense/${id}`, config)
            getExpenses()
        } catch (err) {
            handleRequestError(err);
        }
    }
    
    const getBudgets = async () => {
        if(!token) return;
        try {
            const response = await axios.get(`${BASE_URL}/get-budgets`, config)
            setBudgets(response.data)
        } catch (err) {
            handleRequestError(err);
        }
    }

    const addBudget = async (budget) => {
        try {
            await axios.post(`${BASE_URL}/add-budget`, budget, config)
            getBudgets()
        } catch (err) {
            handleRequestError(err);
        }
    }
    
    const deleteBudget = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-budget/${id}`, config)
            getBudgets()
        } catch (err) {
            handleRequestError(err);
        }
    }

    const totalIncome = () => incomes.reduce((acc, curr) => acc + curr.amount, 0)
    const totalExpense = () => expenses.reduce((acc, curr) => acc + curr.amount, 0)
    const totalBalance = () => totalIncome() - totalExpense()

    return (
        <GlobalContext.Provider value={{
            addIncome, getIncomes, incomes, deleteIncome,
            addExpense, getExpenses, expenses, deleteExpense,
            addBudget, getBudgets, budgets, deleteBudget,
            totalIncome, totalExpense, totalBalance,
            error, setError,
            user, token, login, signup, logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}