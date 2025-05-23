import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminInterface from "./rightdraw-interfaces/AdminInterface";
import FeatureGroup from "../components/features/FeatureGroup";
import { getFeatures } from "../config/features";

const Home = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // Define allowed roles for this route
  const allowedRoles = ["CADesigner", "Approver", "Verifier"];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (
      !user?.role?.some((role) => allowedRoles.includes(role)) &&
      !user?.role?.includes("Admin")
    ) {
      // Redirect to /pibase if not allowed
      navigate("/pibase");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Show Admin UI if user is Admin
  if (user?.role?.includes("Admin")) {
    return <AdminInterface />;
  }

  const hasAllowedRole = user?.role?.some((role) =>
    allowedRoles.includes(role)
  );
  const features = hasAllowedRole ? getFeatures(user) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome back, {user.full_name}
          </h1>
          <p className="text-lg text-neutral-300">
            Select a tool to get started with your project
          </p>
        </div>

        {hasAllowedRole && features.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureGroup
                key={index}
                feature={{
                  ...feature,
                  icon: feature.title === "RightDraw" ? null : feature.icon,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
