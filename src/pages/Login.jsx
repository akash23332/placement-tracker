import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

import {
  FaEnvelope,
  FaLock,
  FaChartLine,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userDetail = {
        email,
        password,
      };

      const res = await fetch(
        "http://localhost:5000/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            userDetail
          ),
        }
      );

      const data = await res.json();

      alert(data.message);

      if (
        data.message ===
        "Login Success"
      ) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "email",
          email
        );

        navigate("/dashboard");
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  return (
    <div className="login-page">

      <div className="blur blur1"></div>
      <div className="blur blur2"></div>
      <div className="blur blur3"></div>

      {/* LEFT SIDE */}

      <div className="left-panel">

        <div className="brand-logo">

          <div className="logo-box">
            <FaChartLine />
          </div>

          <div>
            <h1>Placement</h1>

            <h1 className="gradient-text">
              Tracker
            </h1>
          </div>

        </div>

        <h2>
          Your Personal Placement
          Command Center
        </h2>

        <p>
          Track applications,
          monitor interviews,
          analyze progress and
          land your dream offer.
        </p>

        <div className="feature-list">

          <div className="feature-item">
            ✅ Track Applications
          </div>

          <div className="feature-item">
            🎯 Manage Interviews
          </div>

          <div className="feature-item">
            📈 Analytics Dashboard
          </div>

          <div className="feature-item">
            🏆 Placement Progress
          </div>

        </div>

        <div className="stats-row">

          <div className="stat-card">
            <h3>500+</h3>
            <p>Applications</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Interviews</p>
          </div>

          <div className="stat-card">
            <h3>50+</h3>
            <p>Offers</p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="right-panel">

        <div className="login-card">

          <div className="badge">
            🚀 Student Placement Portal
          </div>

          <h2>
            Welcome Back
          </h2>

          <p>
            Login to continue your
            placement journey
          </p>

          <div className="input-box">

            <FaEnvelope
              className="input-icon"
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          <div className="input-box">

            <FaLock
              className="input-icon"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={handleLogin}
          >
            Login →
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#c4b5fd",
                textDecoration:
                  "none",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <div className="signup-link">

            <p>
              Don't have an account?
            </p>

            <Link to="/signup">
              Sign Up
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;