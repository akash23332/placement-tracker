import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

import API from "../config";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaChartLine,
} from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = {
        name,
        email,
        password,
      };

      const res = await fetch(
        `${API}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data =
        await res.json();

      alert(data.message);

      if (
        data.message ===
        "User Registered"
      ) {
        navigate("/");
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
          Start Your Placement
          Journey
        </h2>

        <p>
          Create your account and
          manage every application,
          interview and offer from
          one dashboard.
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
            🚀 Join Placement Tracker
          </div>

          <h2>
            Create Account
          </h2>

          <p>
            Start tracking your
            placement journey
          </p>

          <div className="input-box">

            <FaUser
              className="input-icon"
            />

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

          </div>

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
              placeholder="Create Password"
              value={password}
              onChange={(e) =>
                setPassword(
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={handleSignup}
          >
            Create Account →
          </button>

          <div className="signup-link">

            <p>
              Already have an account?
            </p>

            <Link to="/">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;