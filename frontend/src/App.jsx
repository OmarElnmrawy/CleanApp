import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard'; 
import Navbar from './components/Navbar';
import SpinningWheel from './pages/SpinningWheel';
import Redeem from './pages/Redeem';
import History from './pages/History';
import AdminRedeem from './pages/AdminRedeem';

function App() {
  // 1. Define isAdmin here so the routes below can use it
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Student Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<SpinningWheel />} />
        <Route path="/history" element={<History />} /> 
        <Route path="/redeem" element={<Redeem />} /> 

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route 
          path="/admin-redeem" 
          element={isAdmin ? <AdminRedeem /> : <Navigate to="/home" />} 
        />

        {/* 2. CRITICAL: Catch-all MUST be the very last route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;