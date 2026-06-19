import React, { useState, useEffect } from "react";
import "../Analytics.css";

import API from "../config";
import {
  FiHome,
  FiBriefcase,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiTrendingUp
} from "react-icons/fi";

import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Analytics = () => {

  const [companies,setCompanies] =
    useState([]);

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#22c55e",
    "#ef4444"
  ];

  const getCompanies = async () => {

    const email =
      localStorage.getItem("email");
      const token =
localStorage.getItem("token");

    const res = await fetch(
      `${API}/companies/${email}`,  {
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

  const successRate =
    totalApplications === 0
      ? 0
      : (
          (selectedCount /
            totalApplications) *
          100
        ).toFixed(0);

  const chartData = [
    {
      name:"Applied",
      value:appliedCount
    },
    {
      name:"Interview",
      value:interviewCount
    },
    {
      name:"Selected",
      value:selectedCount
    },
    {
      name:"Rejected",
      value:rejectedCount
    }
  ];
const pendingCount =
  appliedCount +
  interviewCount;

const recentCompanies =
  [...companies]
  .reverse()
  .slice(0,5);

const appliedPercentage =
  totalApplications === 0
  ? 0
  : Math.round(
      (appliedCount /
      totalApplications) * 100
    );

const interviewPercentage =
  totalApplications === 0
  ? 0
  : Math.round(
      (interviewCount /
      totalApplications) * 100
    );

const selectedPercentage =
  totalApplications === 0
  ? 0
  : Math.round(
      (selectedCount /
      totalApplications) * 100
    );

const rejectedPercentage =
  totalApplications === 0
  ? 0
  : Math.round(
      (rejectedCount /
      totalApplications) * 100
    );
  return (

    <div className="analytics-layout">

      <div className="analytics-sidebar">

        <div>

          <div className="analytics-logo">
            🚀 Placement Tracker
          </div>

          <Link to="/dashboard">
            <div className="analytics-nav">
              <FiHome />
              Dashboard
            </div>
          </Link>

          <Link to="/applications">
            <div className="analytics-nav">
              <FiBriefcase />
              Applications
            </div>
          </Link>

          <Link to="/analytics">
            <div className="analytics-nav active">
              <FiBarChart2 />
              Analytics
            </div>
          </Link>

          <Link to="/profile">
            <div className="analytics-nav">
              <FiUser />
              Profile
            </div>
          </Link>

          <Link to="/settings">
            <div className="analytics-nav">
              <FiSettings />
              Settings
            </div>
          </Link>

        </div>

        <div className="analytics-side-card">

          <h3>
            Success Rate
          </h3>

          <h1>
            {successRate}%
          </h1>

        </div>

      </div>

      <div className="analytics-main">

        <div className="analytics-hero">

          <h1>
            Analytics 📊
          </h1>

          <p>
            Visualize your
            placement journey
            and track progress.
          </p>

        </div>

        <div className="analytics-banner">

          <FiTrendingUp />

          <div>

            <h2>
              Placement Insights
            </h2>

            <p>
              Track interviews,
              offers and overall
              performance.
            </p>

          </div>

        </div>

        <div className="analytics-stats">

          <div className="analytics-card total">
            <span>Total</span>
            <h2>{totalApplications}</h2>
          </div>

          <div className="analytics-card applied">
            <span>Applied</span>
            <h2>{appliedCount}</h2>
          </div>

          <div className="analytics-card interview">
            <span>Interview</span>
            <h2>{interviewCount}</h2>
          </div>

          <div className="analytics-card selected">
            <span>Selected</span>
            <h2>{selectedCount}</h2>
          </div>

          <div className="analytics-card rejected">
            <span>Rejected</span>
            <h2>{rejectedCount}</h2>
          </div>

        </div>

        <div className="analytics-content">

          <div className="chart-card">

            <h2>
              Status Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <PieChart>

                <Pie
  data={chartData}
  dataKey="value"
  innerRadius={90}
  outerRadius={140}
  paddingAngle={5}
  label
>

                  {
                    chartData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />
                      )
                    )
                  }

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>
<div className="analytics-right">

  <div className="insight-card">
    <h3>🎯 Success Rate</h3>
    <h1>{successRate}%</h1>
  </div>

  <div className="insight-card">
    <h3>📨 Pending</h3>
    <h1>{pendingCount}</h1>
  </div>

  <div className="insight-card">
    <h3>🏆 Selected</h3>
    <h1>{selectedCount}</h1>
  </div>

</div>
<div className="progress-section">

  <h2>
    Application Funnel
  </h2>

  <div className="progress-row">
    <span>Applied</span>
    <span>{appliedPercentage}%</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill applied-fill"
      style={{
        width:`${appliedPercentage}%`
      }}
    ></div>
  </div>

  <div className="progress-row">
    <span>Interview</span>
    <span>{interviewPercentage}%</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill interview-fill"
      style={{
        width:`${interviewPercentage}%`
      }}
    ></div>
  </div>

  <div className="progress-row">
    <span>Selected</span>
    <span>{selectedPercentage}%</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill selected-fill"
      style={{
        width:`${selectedPercentage}%`
      }}
    ></div>
  </div>

  <div className="progress-row">
    <span>Rejected</span>
    <span>{rejectedPercentage}%</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill rejected-fill"
      style={{
        width:`${rejectedPercentage}%`
      }}
    ></div>
  </div>

</div>

<div className="recent-section">

  <h2>
    Recent Activity
  </h2>

  {
    recentCompanies.map(
      (item,index)=>(
        <div
          key={index}
          className="recent-item"
        >
          <span>
            {item.name}
          </span>

          <span>
            {item.status}
          </span>
        </div>
      )
    )
  }

</div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;