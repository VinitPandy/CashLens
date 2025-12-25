const BudgetSchema = require("../models/Budget.model")

exports.addBudget = async (req, res) => {
    const {category, limit}  = req.body
    const userId = req.user; 
    
    try {
        if(!category || !limit) return res.status(400).json({message: 'All fields required!'})
        
      
        let budget = await BudgetSchema.findOne({ category, userId }); 

        if(budget){
            budget.limit = limit;
            await budget.save();
            return res.status(200).json({message: 'Budget Updated'})
        }

        budget = BudgetSchema({ category, limit, userId }) 
        await budget.save()
        res.status(200).json({message: 'Budget Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getBudgets = async (req, res) =>{
    const userId = req.user; 
    try {
        const budgets = await BudgetSchema.find({ userId }).sort({createdAt: -1}) 
        res.status(200).json(budgets)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteBudget = async (req, res) =>{
    const {id} = req.params;
    BudgetSchema.findByIdAndDelete(id)
        .then((income) =>{ res.status(200).json({message: 'Budget Deleted'}) })
        .catch((err) =>{ res.status(500).json({message: 'Server Error'}) })
}