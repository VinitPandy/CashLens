import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/Expense.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

export default app;
