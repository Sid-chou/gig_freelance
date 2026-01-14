import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostGig from './pages/PostGig';
import GigDetails from './pages/GigDetails';
import MyGigs from './pages/MyGigs';
import MyBids from './pages/MyBids';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/post-gig" element={<ProtectedRoute><PostGig /></ProtectedRoute>} />
          <Route path="/gig/:id" element={<ProtectedRoute><GigDetails /></ProtectedRoute>} />
          <Route path="/my-gigs" element={<ProtectedRoute><MyGigs /></ProtectedRoute>} />
          <Route path="/my-bids" element={<ProtectedRoute><MyBids /></ProtectedRoute>} />

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
