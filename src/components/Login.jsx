import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      navigate("/");
    } catch (err) {
      if (err.response.status !== 200) {
        setError("User not found or Invalid Credentials");
      }
      console.log(err);
    }
  }

  return (
    <div className="register bg-white p-8 rounded-xl w-80">
      <h1 className="text-2xl font-bold text-center tracking-wider mb-6">
        Login
      </h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username" className="font-semibold tracking-wider">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="block w-full border-b border-gray-400 p-2 outline-none focus:border-blue-400 duration-300 mb-4"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="font-semibold tracking-wider">
          Password
        </label>
        <input
          type="password"
          minLength={5}
          maxLength={25}
          name="password"
          id="password"
          className="block w-full border-b border-gray-400 p-2 outline-none focus:border-blue-400 duration-300 mb-8"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Submit"
          className="block w-full p-2 cursor-pointer bg-blue-500 hover:bg-blue-400 duration-300 text-white text-lg rounded-lg"
        />
        {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <NavLink to={"/register"} className="font-semibold text-blue-400">
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
