import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added state for name
  const [level, setLevel] = useState("National"); // Added state for level
  const [contactNumber, setcontactNumber] = useState(""); // Added state for level
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState(""); // Added state for name error
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [contactNumberError, setcontactNumberError] = useState(""); // Added state for name error
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    if (level !== "National" && !name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }
    if(!contactNumber){
      setcontactNumberError("Phone number is required");
    }else{
      setcontactNumberError("");
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
        body: JSON.stringify({ email, password,contactNumber, role, name, level }), // Include name and level
      });

      if (response.ok) {
        setRegistrationSuccess(true);
        setErrorMessage("");
      } else {
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
            Please <a href="/login">login</a>.
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
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="number"
              id="contactNumber"
              name="cotanctNumber"
              value={contactNumber}
              onChange={(e) => setcontactNumber(e.target.value)}
              required
            />
            <div className="error-message">{contactNumberError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="level">Level:</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="National">National</option>
              <option value="Province">Province</option>
              <option value="Local">Local</option>
              <option value="Ministry">Ministry</option>
            </select>
          </div>
          {level !== "National" && (
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={level !== "National"}
              />
              <div className="error-message">{nameError}</div>
            </div>
          )}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      )}
    </div>
  );
}

export default Register;
