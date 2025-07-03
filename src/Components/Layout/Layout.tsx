// import React, { ReactNode } from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="flex layout overflow-y-hidden sticky bg-gray-200 ">
      <Sidebar />

      <main className="p-4 w-full  h-screen bg-gray-200 overflow-y-auto flex flex-col">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
