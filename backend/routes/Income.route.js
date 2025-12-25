const router = require('express').Router();
const { addIncome, getIncomes, deleteIncome } = require('../controller/Income.controller');
const { protect } = require('../middleware/auth.middleware'); 

router.post('/add-income', protect, addIncome)
router.get('/get-incomes', protect, getIncomes)
router.delete('/delete-income/:id', protect, deleteIncome)

module.exports = router;