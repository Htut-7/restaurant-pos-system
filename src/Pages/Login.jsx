import { useState } from "react";
import "../Css/Login.css";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const {loading,error,signIn}=useAuth();

    const signUser=async(e)=>{
        e.preventDefault();
        let user=await signIn(email,password);
        if (user){
            navigate('/dashboard');
        }
    }

  return (
    <div className="login">
      <div className="login-left">
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

      <div className="loginform-container">
        <form onSubmit={signUser}>
            <h3>Welcome Back!</h3>
            <p>Sign in to access your restaurant dashboard and manage daily operations.</p>

            <div className="login-input">
                <label>Email</label>
                <input type="email" placeholder="Enter email address"
                onChange={(e)=>setEmail(e.target.value)} value={email}
                />

                <label>Password</label>
                <input type="password" placeholder="Enter Password"
                onChange={(e)=>setPassword(e.target.value)} value={password}
                />

                <div className="login-action">
                    <Link to='/register'>Don't have an account?</Link>

                    <div className="forget-option">
                        <Link>Forget Password?</Link>
                    </div>
                </div>

                {error && <p className="login-error">{error}</p>}

                <div className="login-btn">
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="login-spinner"></span> : "Login"}
                    </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}
