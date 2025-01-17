import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import Inventory from '../views/Inventory';
import NotFound from '../views/NotFound.jsx';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default AppRouter;