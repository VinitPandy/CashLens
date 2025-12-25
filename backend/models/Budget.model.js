const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    limit: {
        type: Number,
        required: true,
        maxLength: 50
    }
}, {timestamps: true})

module.exports = mongoose.model('Budget', BudgetSchema);