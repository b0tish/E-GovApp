import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Login successful:", data);
        login(data.user);
        navigate("/home");
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError("Error occured.");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[500px] px-10 py-32 text-center flex flex-col bg-white rounded-lg shadow-md">
        <h2 className="h1 -translate-y-5">Welcome</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="py-2 mx-3 my-2 border-b-2 border-b-red-400 transition-colors duration-300 ease-linear focus:outline-none focus:border-b-red-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="py-2 mx-3 my-2 border-b-2 border-b-red-400 transition-colors duration-300 ease-linear focus:outline-none focus:border-b-red-600"
        />
        <button onClick={handleLogin} className="mt-4 mx-3 p-2 bg-red-500 text-white text-lg font-bold border-2 rounded-md border-red-600">Login</button>

        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
    </div>
  );
}

export default Login;
