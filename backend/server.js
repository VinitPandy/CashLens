const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// --- ROUTES ---
const expenseRoute = require('./routes/Expense.route');
const incomeRoute = require('./routes/Income.route');
const budgetRoute = require('./routes/Budget.route');
const authRoute = require('./routes/Auth.route'); 

app.use('/api/v1', expenseRoute);
app.use('/api/v1', incomeRoute);
app.use('/api/v1', budgetRoute);

app.use('/api/v1/auth', authRoute);

const server = () => {
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server();