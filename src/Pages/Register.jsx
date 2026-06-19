import "../Css/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  let {loading,error,signUp}=useAuth();

  const signUser=async(e)=>{
    e.preventDefault();
    let user=await signUp(name,email,password);
    if(user){
        navigate('/login');
    }
  }

  return (
    <div className="register">
      <div className="register-left">
        <div className="left-content">
          <span className="badge">Restaurant Management Platform</span>

          <h1>Restaurant POS System</h1>

          <p>
            Manage orders, menu items, and sales reports from a single dashboard
            designed for modern restaurants.
          </p>

          <div className="features">
            <div className="feature-card">
              <h4>Menu Management</h4>
              <span>Create and manage menu items easily.</span>
            </div>

            <div className="feature-card">
              <h4>Order Tracking</h4>
              <span>Monitor customer orders in real time.</span>
            </div>

            <div className="feature-card">
              <h4>Sales Analytics</h4>
              <span>Track revenue and business performance.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="regform-container">
        <form className="reg-form" onSubmit={signUser}>
          <h3>Get Started</h3>
          <p>Register to start managing your restaurant operations.</p>

          <div className="regform-input">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="reg-action">
              <Link to="/login">Already have an account?</Link>
            </div>

            {error && <p className="reg-error">{error}</p>}

            <div className="reg-btn">
                <button type="submit" disabled={loading}>
                    {loading ? <span className="reg-spinner"></span> : "Register" }
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
