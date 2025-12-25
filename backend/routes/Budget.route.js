const router = require('express').Router();
const { addBudget, getBudgets, deleteBudget } = require('../controller/Budget.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/add-budget', protect, addBudget)
router.get('/get-budgets', protect, getBudgets)
router.delete('/delete-budget/:id', protect, deleteBudget)

module.exports = router;