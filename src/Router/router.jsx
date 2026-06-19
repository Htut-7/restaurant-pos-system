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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        element: <DashboardLayout/>,
        children:[
          {
            index: true,
            element: <Dashboard/>
          },
          {
            path: 'category',
            element: <Categories/>
          },
          {
            path: 'menu',
            element: <Menu/>
          },
          {
            path: 'editmenu/:id',
            element: <EditMenu/>
          },
          {
            path: 'editcategory/:id',
            element: <EditCategory/>
          },
          {
            path: 'pos',
            element: <POS/>
          },
          {
            path: 'orders',
            element: <Orders/>
          }
        ]
      }
    ]
  },
]);

export default router;
