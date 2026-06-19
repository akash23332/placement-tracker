import React, {
  useState,
  useEffect
} from "react";

import "../Applications.css";
import CompanyCard from "../components/CompanyCard";

import API from "../config";
import {
  FiHome,
  FiBriefcase,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiSearch
} from "react-icons/fi";

import { Link } from "react-router-dom";

const Applications = () => {

  const [companies,
    setCompanies] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [sortOrder,
    setSortOrder] =
    useState("A-Z");

  const getCompanies =
  async () => {

    const email =
      localStorage.getItem(
        "email"
      );
const token =
localStorage.getItem(
  "token"
);
    const res = await fetch(
      `${API}/companies/${email}`,{headers:{
  authorization:token
}}
    );

    const data =
      await res.json();

    setCompanies(data);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const deletecompany =
  async (id) => {
const token =
localStorage.getItem("token");
    await fetch(
      `${API}/companies/${id}`,
      {
        method:"DELETE",
        headers:{
  authorization:token
}
      }
    );

    getCompanies();
  };

  const updateStatus =
  async (id,status) => {
const token =
localStorage.getItem("token");
    await fetch(
      `${API}/companies/${id}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":
          "application/json",
              authorization:token
        },
        body:JSON.stringify({
          status
        })
      }
    );

    getCompanies();
  };

  const filteredCompanies =
    companies.filter(
      (item)=>
      item.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
    );

  const sortedCompanies =
    [...filteredCompanies]
    .sort((a,b)=>{

      if(
        sortOrder ===
        "A-Z"
      ){
        return a.name
        .localeCompare(
          b.name
        );
      }

      return b.name
      .localeCompare(
        a.name
      );

    });

  return (

    <div className="dashboard-page">

      <div className="dashboard-sidebar">

        <div>

          <div className="dashboard-logo">
            🚀 Placement Tracker
          </div>

          <Link to="/dashboard">
            <div className="dashboard-nav">
              <FiHome />
              Dashboard
            </div>
          </Link>

          <Link to="/applications">
            <div className="dashboard-nav active">
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

      </div>

      <div className="dashboard-main">

        <div className="applications-header">

          <h1>
            Applications
          </h1>

          <p>
            Manage and track all your
            job applications.
          </p>

        </div>

        <div className="applications-toolbar">

          <div className="search-box">

            <FiSearch />

            <input
              type="text"
              placeholder="Search Company..."
              value={search}
              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <select
            value={sortOrder}
            onChange={(e)=>
              setSortOrder(
                e.target.value
              )
            }
          >
            <option>
              A-Z
            </option>

            <option>
              Z-A
            </option>

          </select>

        </div>

        <div className="applications-grid">

          {
            sortedCompanies.length
            === 0

            ?

            <div className="empty-state">

              <h2>
                No Applications
              </h2>

              <p>
                Add your first
                application from
                Dashboard.
              </p>

            </div>

            :

            sortedCompanies.map(
              (
                item,
                index
              ) => (

                <CompanyCard
                  key={index}
                  name={item.name}
                  id={item._id}
                  appliedDate={
                    item.appliedDate
                  }
                  notes={
                    item.notes
                  }
                  status={
                    item.status
                  }
                  deletecompany={
                    deletecompany
                  }
                  updateStatus={
                    updateStatus
                  }
                />

              )
            )
          }

        </div>

      </div>

    </div>
  );
};

export default Applications;