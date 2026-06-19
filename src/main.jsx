import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Router/router";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);
