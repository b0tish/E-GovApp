import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Registration successful
        setRegistrationSuccess(true);
        setErrorMessage("");
        // Redirect to login page or dashboard (replace with your actual route)
        // window.location.href = "/login"; // Not recommended for React Router
      } else {
        // Registration failed
        const data = await response.json();
        setErrorMessage(data.message || "Unknown error");
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Network error");
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {registrationSuccess ? (
        <div>
          <p>Registration successful!</p>
          <p>
            Please <a href="/login">login</a>.{" "}
            {/* Replace with your login route */}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="error-message">{emailError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="error-message">{passwordError}</div>
          </div>
          <button type="submit">Register</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      )}
    </div>
  );
}

export default Register;
