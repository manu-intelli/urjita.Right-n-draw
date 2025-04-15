import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import { Sample } from "../pages/Sample";
import RightDrawWrapper from "../pages/RightDrawWrapper";
import CreationInterface from "../pages/page21-interfaces/Page21Creation/CreationInterface";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
//const About = lazy(() => import("../pages/About"));
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
            <ProtectedRoute>
              <RightDrawWrapper />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "sample",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <Sample />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "page21",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CreationInterface />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      ,
    ],
  },
]);
