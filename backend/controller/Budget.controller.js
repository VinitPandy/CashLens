const BudgetSchema = require("../models/Budget.model")

exports.addBudget = async (req, res) => {
    // TRAP #1: Did the request reach the controller?
    console.log("👉 TRAP 1: Request received at addBudget"); 
    console.log("👉 Body:", req.body);

    const { category, limit } = req.body;
    
    // TRAP #2: Check the User ID
    const userId = req.user.id || req.user._id || req.user; 
    console.log("👉 TRAP 2: User ID found:", userId);

    try {
        if (!category || !limit) {
            console.log("👉 TRAP 3: Missing fields");
            return res.status(400).json({ message: 'All fields required!' });
        }

        // TRAP #4: Before searching DB
        console.log("👉 TRAP 4: Searching for existing budget...");
        let budget = await BudgetSchema.findOne({ category, userId });

        if (budget) {
            console.log("👉 TRAP 5: Budget found, updating...");
            budget.limit = limit;
            await budget.save();
            console.log("👉 TRAP 6: Update SUCCESS");
            return res.status(200).json({ message: 'Budget Updated' });
        }

        // TRAP #7: Creating new budget
        console.log("👉 TRAP 7: No budget found, creating NEW one...");
        
        // *** CRITICAL FIX: Added 'new' keyword here ***
        budget = new BudgetSchema({ category, limit, userId }); 

        // TRAP #8: Saving to DB
        console.log("👉 TRAP 8: Saving to database...");
        await budget.save();
        
        console.log("👉 TRAP 9: Save SUCCESS");
        res.status(200).json({ message: 'Budget Added' });

    } catch (error) {
        // TRAP #10: The Error Trap!
        console.error("❌ ERROR TRAP CAUGHT IT:", error);
        res.status(500).json({ message: error.message });
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