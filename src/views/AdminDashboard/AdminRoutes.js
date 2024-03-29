// AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import DishView from'../../views/Dishes/DishView'; 

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/dishes" element={<DishView />} />
    </Routes>
  );
}

export default AdminRoutes;
