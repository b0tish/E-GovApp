import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
   
      sessionStorage.setItem("userRole", "government");
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/");
   
  };

  return (
    <div className="container">
      <h2>Login as Government Official</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
