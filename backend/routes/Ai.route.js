const router = require('express').Router();
const { getFinancialAdvice } = require('../controller/AiController');
router.get('/financial-advice', getFinancialAdvice);
module.exports = router;