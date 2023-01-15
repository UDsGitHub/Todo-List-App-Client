import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center max-w-screen-lg mx-auto pt-4">
      <h3 className="text-3xl font-semibold logo">TODO APP</h3>
      <div className="flex items-center gap-4">
        <a href="#" className="login-btn whitespace-nowrap">Log in</a>
        <a
          href="#"
          className="register-btn bg-sky-600 text-white p-2 px-3 rounded-full"
        >
          Register
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
