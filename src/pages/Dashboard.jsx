import React, { useState, useEffect } from "react";
import "../Dashboard.css";

import API from "../config";
import {
  FiHome,
  FiBriefcase,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiLogOut,
  FiPlusCircle
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const [company,setCompany] = useState("");
  const [appliedDate,setAppliedDate] = useState("");
  const [notes,setNotes] = useState("");

  const [companies,setCompanies] = useState([]);

  const navigate = useNavigate();

 const getCompanies = async () => {

  const email =
    localStorage.getItem("email");

  const token =
    localStorage.getItem("token");

  const res = await fetch(
    `${API}/companies/${email}`,
    {
      headers:{
        authorization:token
      }
    }
  );

  const data =
    await res.json();

  setCompanies(data);

};

  useEffect(() => {
    getCompanies();
  }, []);

  const addCompany = async () => {

    const newCompany = {
      name: company,
      status: "Applied",
      appliedDate,
      notes,
      userEmail:
        localStorage.getItem("email")
    };
    const token =
localStorage.getItem("token");

    await fetch(
      `${API}/companies`,
      {
        method:"POST",
        headers:{
          "Content-Type":
          "application/json",authorization:token
        },
        body:JSON.stringify(
          newCompany
        )
      }
    );

    getCompanies();

    setCompany("");
    setAppliedDate("");
    setNotes("");
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  const totalApplications =
    companies.length;

  const appliedCount =
    companies.filter(
      item =>
      item.status === "Applied"
    ).length;

  const interviewCount =
    companies.filter(
      item =>
      item.status === "Interview"
    ).length;

  const selectedCount =
    companies.filter(
      item =>
      item.status === "Selected"
    ).length;

  const rejectedCount =
    companies.filter(
      item =>
      item.status === "Rejected"
    ).length;

  return (

    <div className="dashboard-page">

      {/* SIDEBAR */}

      <div className="dashboard-sidebar">

        <div>

          <div className="dashboard-logo">
            🚀 Placement Tracker
          </div>

          <Link to="/dashboard">
            <div className="dashboard-nav active">
              <FiHome />
              Dashboard
            </div>
          </Link>

          <Link to="/applications">
            <div className="dashboard-nav">
              <FiBriefcase />
              Applications
            </div>
          </Link>

          <Link to="/analytics">
            <div className="dashboard-nav">
              <FiBarChart2 />
              Analytics
            </div>
          </Link>

          <Link to="/profile">
            <div className="dashboard-nav">
              <FiUser />
              Profile
            </div>
          </Link>

          <Link to="/settings">
            <div className="dashboard-nav">
              <FiSettings />
              Settings
            </div>
          </Link>

        </div>

        <div className="dashboard-user-card">

          <h3>
            Total Applications
          </h3>

          <h1>
            {totalApplications}
          </h1>

        </div>

      </div>

      {/* MAIN */}

      <div className="dashboard-main">

        <div className="dashboard-top">

          <div>

            <h1>
              Welcome Back 👋
            </h1>

            <p>
              Track every
              application and
              land your dream job.
            </p>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>

        </div>

        {/* HERO */}

        <div className="hero-banner">

          <h2>
            🚀 Placement Tracker
          </h2>

          <p>
            Manage applications,
            interviews and offers
            from one place.
          </p>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-box total">
            <span>Total</span>
            <h2>{totalApplications}</h2>
          </div>

          <div className="stat-box applied">
            <span>Applied</span>
            <h2>{appliedCount}</h2>
          </div>

          <div className="stat-box interview">
            <span>Interview</span>
            <h2>{interviewCount}</h2>
          </div>

          <div className="stat-box selected">
            <span>Selected</span>
            <h2>{selectedCount}</h2>
          </div>

          <div className="stat-box rejected">
            <span>Rejected</span>
            <h2>{rejectedCount}</h2>
          </div>

        </div>

        {/* FORM */}

        <div className="add-card">

          <h2>
            <FiPlusCircle />
            Add New Application
          </h2>

          <div className="form-row">

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e)=>
                setCompany(
                  e.target.value
                )
              }
            />

            <input
              type="date"
              value={appliedDate}
              onChange={(e)=>
                setAppliedDate(
                  e.target.value
                )
              }
            />

          </div>

          <textarea
            placeholder="Notes..."
            value={notes}
            onChange={(e)=>
              setNotes(
                e.target.value
              )
            }
          />

          <button
            className="add-btn"
            onClick={addCompany}
          >
            Add Company
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;