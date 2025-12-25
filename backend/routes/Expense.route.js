const router = require('express').Router();
const { addExpense, getExpenses, deleteExpense } = require('../controller/Expense.controller');
const { protect } = require('../middleware/auth.middleware'); 

router.post('/add-expense', protect, addExpense)
router.get('/get-expenses', protect, getExpenses) 
router.delete('/delete-expense/:id', protect, deleteExpense) 

module.exports = router;