import React from 'react';
import SideBar from '../Components/Dashboard/SideBar';
import StatContent from '../Components/Dashboard/StatContent';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className="flex ">
      <div className='w-70 py-8 px-4 sticky top-0 h-[100vh]  '>
        <SideBar/>
      </div>
      <div className='flex-1 sticky top-0  bg-p-color rounded-l-2xl min-h-screen p-4 overflow-auto'>
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;