// AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import DishView from'../../views/Dishes/DishView'; 
import DiningTableView from '../DiningTable/DiningTableView';
import WaiterView from '../Waiters/WaiterView';
import TicketView from '../Tickets/TicketView';
import TicketTodayView from '../Tickets/TicketTodayView';
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/dishes" element={<DishView />} />
      <Route path='/tables' element={<DiningTableView />} />
      <Route path='/waiters' element={<WaiterView />} />
      <Route path='/tickets' element={<TicketView />} />
      <Route path='/tickets/today' element={<TicketTodayView />} />
    </Routes>
  );
}

export default AdminRoutes;
