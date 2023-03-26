import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let errs = [];

    let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,25}$/;
    if (
      username.length >= 2 &&
      password.length >= 5 &&
      password.match(validPassword)
    ) {
      try {
        const res = await axios.post("/auth/register", {
          username,
          password,
        });
        console.log(res);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      if (!password.match(validPassword)) {
        errs.push(
          "password must contain at least one uppercase, lowercase, number, and special character"
        );
      }
      setErrors(errs);
    }
  }

  return (
    <div className="register bg-white p-8 rounded-xl w-80">
      <h1 className="text-2xl font-bold text-center tracking-wider mb-6">
        Register
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

        {errors.length && (
          <ul className="list-disc text-red-600 font-semibold mt-4">
            {errors.map((err, i) => (
              <li className="block" key={i}>
                {err}
              </li>
            ))}
          </ul>
        )}
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <NavLink to={"/login"} className="font-semibold text-blue-400">
          Log in
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
