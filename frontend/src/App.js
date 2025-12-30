import { useState,useEffect} from "react"; // 1. Import useState
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/LandingPage";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useGlobalContext } from "./context/globalContext";

export default function App() {
  const location = useLocation();
  const { token ,setError} = useGlobalContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setError(null); 
  }, [location.pathname]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-black text-white relative">
        
        {token ? (
            <div className="flex h-screen overflow-hidden">
              <Sidebar 
                  isOpen={isSidebarOpen} 
                  closeSidebar={() => setIsSidebarOpen(false)} 
              />
              
              {isSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                ></div>
              )}

              <div className="flex-1 flex flex-col min-w-0 overflow-auto">
                <Topbar toggleSidebar={toggleSidebar} />
                
                <div className="p-4 flex-1">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/incomes" element={<Incomes />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/budgets" element={<Budget />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </div>
        ) : (
           <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        
      </div>
  );
}