import React from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

import LoadingSpinner from "../components/common/LoadingSpinner";
import CreationInterface from "./page21-interfaces/Page21Creation/CreationInterface";

const Page21Wrapper = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { showDashboard } = useOutletContext();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // Redirect if no user
  if (!user) {
    navigate("/login");
    return null;
  }

  // Check if user has roles
  if (!Array.isArray(user.role) || user.role.length === 0) {
    console.error("User roles are undefined or empty");
    return <div>Invalid User Role</div>;
  }

  // Check if the requested role is one of the user's assigned roles
  if (!user.role.includes(role)) {
    console.error("User does not have access to this role interface");
    navigate("/");
    return null;
  }


  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="p-6 mt-8">{CreationInterface}</div>
    </div>
  );
};

export default Page21Wrapper;
