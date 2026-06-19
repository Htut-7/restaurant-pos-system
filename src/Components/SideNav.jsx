import { NavLink, useNavigate } from "react-router-dom";
import "../Css/SideNav.css";
import {
  MdDashboard,
  MdRestaurantMenu,
  MdCategory,
  MdPointOfSale,
  MdReceiptLong,
  MdPersonAdd,
  MdLogin,
  MdLogout,
  MdRestaurant,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext, useState } from "react";
import useAuth from "../Hooks/useAuth";

export default function SideNav() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const logUser = async (e) => {
    e.preventDefault();
    await logOut();
    navigate("/login");
    setShowMenu(false);
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setShowMenu(true)}
      >
        <MdMenu />
      </button>

      {showMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowMenu(false)}
        ></div>
      )}

      <aside className={`sidebar ${showMenu ? "show" : ""}`}>
        <div className="sidebar-logo">
          <MdRestaurant />

          <div>
            <h3>Forks & Dishes</h3>
            <span>Restaurant POS</span>
          </div>

          <button
            className="close-sidebar"
            onClick={() => setShowMenu(false)}
          >
            <MdClose />
          </button>
        </div>

        <nav>
          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
          >
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/category"
            onClick={() => setShowMenu(false)}
          >
            <MdCategory />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/menu"
            onClick={() => setShowMenu(false)}
          >
            <MdRestaurantMenu />
            <span>Menu Items</span>
          </NavLink>

          <NavLink
            to="/pos"
            onClick={() => setShowMenu(false)}
          >
            <MdPointOfSale />
            <span>POS</span>
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setShowMenu(false)}
          >
            <MdReceiptLong />
            <span>Orders</span>
          </NavLink>
        </nav>

        <div className="nav-action">
          {!user && (
            <>
              <NavLink
                to="/register"
                onClick={() => setShowMenu(false)}
              >
                <MdPersonAdd />
                Register
              </NavLink>

              <NavLink
                to="/login"
                onClick={() => setShowMenu(false)}
              >
                <MdLogin />
                Login
              </NavLink>
            </>
          )}

          {!!user && (
            <button onClick={logUser}>
              <MdLogout />
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
}