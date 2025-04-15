import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes";
import "./index.css";
import { Page21Provider } from "./context/Page21Context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Page21Provider>
        <RouterProvider router={router} />
      </Page21Provider>
    </AuthProvider>
  </StrictMode>
);
