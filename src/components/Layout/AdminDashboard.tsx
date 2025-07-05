import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          {/* This is where the main content will be rendered. The Outlet component will render the matched child route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
