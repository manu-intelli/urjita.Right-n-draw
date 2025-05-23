import { Navigate, useLocation } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";



export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // user.role is an array, check if any user.role is in allowedRoles
  const hasRole =
    allowedRoles.length === 0 || 
    (Array.isArray(user.role) && user.role.some(role => allowedRoles.includes(role)));

  if (!hasRole) {
    return <AccessDenied />;
  }

  return children;
}
