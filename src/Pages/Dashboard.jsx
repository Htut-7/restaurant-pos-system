import "../Css/Dashboard.css";
import useOrder from "../Hooks/useOrder";
import useMenu from "../Hooks/useMenu";
import useCategory from "../Hooks/useCategory";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { getOrder, order } = useOrder();
  const { getMenu, menu } = useMenu();
  const { getCategory, category } = useCategory();

  const totalRevenue = order.reduce(
    (sum, item) => sum + Number(item.orderTotal),
    0,
  );

  const chartData = order.map((o) => ({
    orderId: o.id.slice(0, 6),
    revenue: o.orderTotal,
  }));

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="dashboard-contents">
          <div className="order-card">
            <span>Total Orders</span>
            <h3>{order.length}</h3>
          </div>

          <div className="menu-card">
            <span>Menu Items</span>
            <h3>{menu.length}</h3>
          </div>

          <div className="category-card">
            <span>Categories</span>
            <h3>{category.length}</h3>
          </div>

          <div className="revenue-card">
            <span>Revenue</span>
            <h3>฿{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="revenue-chart">
        <h3>Revenue by Order</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="orderId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>

        <div className="recent-orders-list">
          {order.slice(0, 5).map((o) => (
            <div className="single-recent" key={o.id}>
              <div className="single-order-info">
                <h4>Order #{o.id.slice(0, 6)}</h4>
                <p>{o.orderItem.length} Item(s)</p>
              </div>

              <div className="single-detail">
                <span>฿{o.orderTotal}</span>
                <p>{o.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
