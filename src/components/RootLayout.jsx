import React from 'react'
import Navbar from './Navbar';
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="App px-4">
      <Navbar />
      <main className="pt-12">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout