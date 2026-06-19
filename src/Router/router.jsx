import App from "../App";
import {
  createBrowserRouter,
} from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Categories from "../Pages/Categories";
import Menu from "../Pages/Menu";
import EditMenu from "../Pages/EditMenu";
import EditCategory from "../Pages/EditCategory";
import POS from "../Pages/POS";
import Orders from "../Pages/Orders";

import ProtectedRoute from "../Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "category",
            element: <Categories />,
          },
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "editmenu/:id",
            element: <EditMenu />,
          },
          {
            path: "editcategory/:id",
            element: <EditCategory />,
          },
          {
            path: "pos",
            element: <POS />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

export default router;