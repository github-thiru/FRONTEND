import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    } catch (err) {
      console.error("Invalid token format");
      setUserRole(null);
    }
  }, [location]); // 🔁 Re-run when route changes (helps after login/logout)

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null); // 🔄 Immediately clear role in UI
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/login">🗂️ Task Manager</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!userRole && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Register</Link>
              </li>
            </>
          )}

          {userRole === "user" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          {userRole === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
