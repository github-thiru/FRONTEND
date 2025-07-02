import { Navigate } from "react-router-dom";

function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isAdmin = payload.role === "admin";

    if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;
    return children;

  } catch (err) {
    console.error("Invalid token");
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
