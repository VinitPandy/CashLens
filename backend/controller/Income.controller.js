const IncomeSchema = require("../models/Income.model")

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    const userId = req.user; 

    const income = IncomeSchema({
        title, amount, category, description, date, userId 
    })
 
    try {
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        console.log("🔴 Database Error:", error.message);
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getIncomes = async (req, res) =>{
    const userId = req.user; 
    try {
        const incomes = await IncomeSchema.find({ userId }).sort({createdAt: -1}) 
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{ res.status(200).json({message: 'Income Deleted'}) })
        .catch((err) =>{ res.status(500).json({message: 'Server Error'}) })
}