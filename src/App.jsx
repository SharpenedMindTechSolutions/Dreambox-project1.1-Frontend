import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './Pages/Loginpage';
import Register from './Pages/Registerpage';
import ForgotPassword from './Pages/Forgotpasswordpage';
import ResetPassword from './Pages/Resetpasswordpage';
import Home from './Pages/Homepage';

import Userdashboard from './Pages/Userdashboard';
import ProtectedRoute from '../src/Components/auth/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/:id"            
          element={
            <ProtectedRoute>
              <Userdashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/c/:roadmapId"
          element={
            <ProtectedRoute>
              <Userdashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<div className="p-4">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

