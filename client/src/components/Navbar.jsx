import axios from "axios";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setUser, ready } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout() {
    axios.post("/auth/logout").then(({data}) => {
      if(data){
        setUser(null);
        navigate("/login")
      }
    })
  }

  return (
    <nav className="flex justify-between items-center max-w-screen-lg mx-auto pt-4">
      <NavLink className="text-3xl font-semibold logo" to="/">
        TODO APP
      </NavLink>
      <div className="flex items-center gap-4">
        {ready && user ? (
          <>
            <p className="font-bold">Hi, {user.username}</p>
            <p
              to="login"
              className="register-btn bg-sky-600 text-white p-2 px-3 rounded-full cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
          </>
        ) : (
          <>
            <NavLink to="login" className="login-btn whitespace-nowrap">
              Log in
            </NavLink>
            <NavLink
              to="register"
              className="register-btn bg-sky-600 text-white p-2 px-3 rounded-full"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
