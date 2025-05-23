import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import { Sample } from "../pages/Sample";
import RightDrawWrapper from "../pages/RightDrawWrapper";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "right-draw/:role",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute allowedRoles={["CADesigner", "Approver", "Verifier"]}>
              <RightDrawWrapper />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "sample",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Sample />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      // {
      //   path: "about",
      //   element: (
      //     <Suspense fallback={<LoadingSpinner />}>
      //       <About />
      //     </Suspense>
      //   ),
      // },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "pibase",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute allowedRoles={["DesignEngineer"]}>
              <DesignEngineer />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "pibase/:action",// action can be "create" or "edit"
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute allowedRoles={["DesignEngineer"]}>
              <CreateAndEditRecord />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);
