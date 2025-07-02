import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

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
      navigate("/login"); // redirect after success
    } catch (err) {
      console.error("❌ Registration error:", err.response);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>📝 Register</h2>
      <form onSubmit={handleRegister}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn-success w-100">Register</button>
        <p className="mt-3 text-center">
          Already registered? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
