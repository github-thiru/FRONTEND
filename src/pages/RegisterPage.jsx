import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Registerpage.css"; // ✅ custom CSS file

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err.response);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="register-button">
          Register
        </button>

        <p className="text-center mt-3">
          Already registered? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
