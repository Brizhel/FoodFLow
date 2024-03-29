// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Login from './views/Login/Login';
import { UserProvider } from './UserContext';
import WaiterDashboard from './views/WaiterDashboard/WaiterDashboard';
import './styles.css';
import AdminDashboard  from './views/AdminDashboard/AdminDashboard';
const App = () => (
  <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/waiter" element={<WaiterDashboard />}/>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </UserProvider>
  </BrowserRouter>
);
export default App;
