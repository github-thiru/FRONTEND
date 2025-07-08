import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Loginpage.css"; // ✅ custom CSS

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Login Successful!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const message = error.response?.data?.message || "❌ Login failed";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">User Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
