import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import "../Css/DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <SideNav />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}