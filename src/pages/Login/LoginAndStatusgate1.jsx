// pages/Login/LoginAndStatusgate1.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LairryInstituteLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials
    const dummyEmail = "test@institute.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && password === dummyPassword) {
      localStorage.setItem("auth", "true"); // store auth status
      navigate("/institute"); // redirect to dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Institute Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Use email: <b>test@institute.com</b> | password: <b>password123</b></p>
    </div>
  );
}
