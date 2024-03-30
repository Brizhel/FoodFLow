// AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import DishView from'../../views/Dishes/DishView'; 
import DiningTableView from '../DiningTable/DiningTableView';
import WaiterView from '../Waiters/WaiterView';
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/dishes" element={<DishView />} />
      <Route path='/tables' element={<DiningTableView />} />
      <Route path='/waiters' element={<WaiterView />} />
    </Routes>
  );
}

export default AdminRoutes;
