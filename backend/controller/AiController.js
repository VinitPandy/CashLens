// 1. LOAD ENV VARIABLES FIRST
require('dotenv').config();

const IncomeSchema = require("../models/Income.Model");
const ExpenseSchema = require("../models/Expense.Model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 2. Initialize Gemini with the loaded key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getFinancialAdvice = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });

        const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const balance = totalIncome - totalExpense;

        const prompt = `
            Act as a financial advisor. Here is my financial data for this month:
            - Total Income: ₹${totalIncome}
            - Total Expenses: ₹${totalExpense}
            - Balance: ₹${balance}
            - Recent Expenses: ${expenses.slice(0, 5).map(e => `${e.title}: ₹${e.amount}`).join(", ")}
            
            Analyze my spending habits and give me 1 specific, actionable tip to save money or invest better. 
            Keep the response short (max 2 sentences).
        `;

        // 3. CORRECT MODEL INITIALIZATION
        // Use "gemini-1.5-flash" (current standard) or "gemini-pro" (older stable)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const advice = response.text();

        res.status(200).json({ advice });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "AI Service Unavailable", error: error.message });
    }
};