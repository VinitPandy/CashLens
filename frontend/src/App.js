import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useGlobalContext } from "./context/globalContext";

export default function App() {
  const { token } = useGlobalContext();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-black text-white">
        
        {/* IF LOGGED IN: Show Sidebar + Content */}
        {token ? (
            <div className="flex">
              <Sidebar />
              <div className="flex-1 min-w-0">
                <Topbar />
                <div className="p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/incomes" element={<Incomes />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/budgets" element={<Budget />} />
                    {/* Redirect any unknown routes back to dashboard */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </div>
        ) : (
            // IF NOT LOGGED IN: Show Only Login/Signup
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )}
        
      </div>
    </Router>
  );
}