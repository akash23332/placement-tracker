import React, {
  useEffect,
  useState
} from "react";

import "../Profile.css";

import API from "../config";
import {
  FiHome,
  FiBriefcase,
  FiBarChart2,
  FiUser,
  FiSettings
} from "react-icons/fi";

import { Link } from "react-router-dom";

const Profile = () => {
const [isEditing,setIsEditing] =
useState(false);
  const [companies,
    setCompanies] =
    useState([]);

  const [user,
    setUser] =
    useState({});
    const [university,setUniversity] =
useState("");

const [branch,setBranch] =
useState("");

const [graduationYear,
setGraduationYear] =
useState("");

const [github,setGithub] =
useState("");

const [linkedin,setLinkedin] =
useState("");

const [targetCompany,
setTargetCompany] =
useState("");

  const getProfile = async () => {

  const email =
    localStorage.getItem("email");
    const token =
localStorage.getItem("token");

  const res = await fetch(
    `${API}/profile/${email}`, {
    headers:{
      authorization:token
    }}
  );

  const data =
    await res.json();

  setUser(data);

  setUniversity(
    data.university || ""
  );

  setBranch(
    data.branch || ""
  );

  setGraduationYear(
    data.graduationYear || ""
  );

  setGithub(
    data.github || ""
  );

  setLinkedin(
    data.linkedin || ""
  );

  setTargetCompany(
    data.targetCompany || ""
  );
  if(
  !data.university &&
  !data.branch &&
  !data.github
){
  setIsEditing(true);
}

};

  const getCompanies =
  async () => {

    const email =
      localStorage.getItem(
        "email"
      );
      const token =
localStorage.getItem("token");

    const res =
      await fetch(
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

    getProfile();
    getCompanies();

  }, []);

  const totalApplications =
    companies.length;

  const selectedCount =
    companies.filter(
      item =>
      item.status ===
      "Selected"
    ).length;

  const appliedCount =
    companies.filter(
      item =>
      item.status ===
      "Applied"
    ).length;

  const interviewCount =
    companies.filter(
      item =>
      item.status ===
      "Interview"
    ).length;

  const rejectedCount =
    companies.filter(
      item =>
      item.status ===
      "Rejected"
    ).length;

  const successRate =
    totalApplications > 0
    ?
    (
      (
        selectedCount /
        totalApplications
      ) * 100
    ).toFixed(1)
    :
    0;

  const recentCompanies =
    [...companies]
    .reverse()
    .slice(0,5);

    const saveProfile = async() => {
const token =
localStorage.getItem("token");
  await fetch(

    `${API}/profile/${user.email}`,

    {
      method:"PUT",

      headers:{
        "Content-Type":
        "application/json",
         authorization:token
      },

      body:JSON.stringify({

        university,

        branch,

        graduationYear,

        github,

        linkedin,

        targetCompany

      })

    }

  );

  alert(
    "Profile Updated"
  );

};
  return (

    <div className="profile-layout">

      <div className="profile-sidebar">

        <div>

          <div className="profile-logo">
            🚀 Placement Tracker
          </div>

          <Link to="/dashboard">
            <div className="profile-nav">
              <FiHome />
              Dashboard
            </div>
          </Link>

          <Link to="/applications">
            <div className="profile-nav">
              <FiBriefcase />
              Applications
            </div>
          </Link>

          <Link to="/analytics">
            <div className="profile-nav">
              <FiBarChart2 />
              Analytics
            </div>
          </Link>

          <Link to="/profile">
            <div className="profile-nav active">
              <FiUser />
              Profile
            </div>
          </Link>

          <Link to="/settings">
            <div className="profile-nav">
              <FiSettings />
              Settings
            </div>
          </Link>

        </div>

        <div className="profile-side-card">

          <h3>
            Success Rate
          </h3>

          <h1>
            {successRate}%
          </h1>

        </div>

      </div>

      <div className="profile-main">

        <div className="profile-hero">

          <div className="profile-avatar">

            {
              user.name
              ?.charAt(0)
              ?.toUpperCase()
            }

          </div>
<div className="profile-info">

  <h1>
    {user.name}
  </h1>

  <div className="profile-tags">

    <span>
      🎓 {branch || "Branch"}
    </span>

    <span>
      🏫 {university || "University"}
    </span>

    <span>
      🎯 {targetCompany || "Target Company"}
    </span>

  </div>

  <p className="profile-email">
    {user.email}
  </p>

</div>

        </div>

        
          

       
{
  !isEditing ?

  <div className="profile-details-card">

    <div className="details-header">

      <h2>
        Profile Details
      </h2>

      <button
        className="edit-btn"
        onClick={()=>
          setIsEditing(true)
        }
      >
        Edit Profile
      </button>

    </div>

    <div className="details-grid">

      <div>
        <span>University</span>
        <h3>
          {university || "Not Added"}
        </h3>
      </div>

      <div>
        <span>Branch</span>
        <h3>
          {branch || "Not Added"}
        </h3>
      </div>

      <div>
        <span>Graduation Year</span>
        <h3>
          {graduationYear || "Not Added"}
        </h3>
      </div>

      <div>
        <span>Target Company</span>
        <h3>
          {targetCompany || "Not Added"}
        </h3>
      </div>

      <div>
        <span>GitHub</span>
        <h3>
          {github || "Not Added"}
        </h3>
      </div>

      <div>
        <span>LinkedIn</span>
        <h3>
          {linkedin || "Not Added"}
        </h3>
      </div>

    </div>

  </div>

  :

  <div className="profile-form-card">

    <h2>
      Edit Profile
    </h2>

    <div className="profile-form-grid">

      <div className="profile-input-group">
        <label>University</label>

        <input
          type="text"
          value={university}
          onChange={(e)=>
            setUniversity(
              e.target.value
            )
          }
        />
      </div>

      <div className="profile-input-group">
        <label>Branch</label>

        <input
          type="text"
          value={branch}
          onChange={(e)=>
            setBranch(
              e.target.value
            )
          }
        />
      </div>

      <div className="profile-input-group">
        <label>
          Graduation Year
        </label>

        <input
          type="text"
          value={graduationYear}
          onChange={(e)=>
            setGraduationYear(
              e.target.value
            )
          }
        />
      </div>

      <div className="profile-input-group">
        <label>
          Target Company
        </label>

        <input
          type="text"
          value={targetCompany}
          onChange={(e)=>
            setTargetCompany(
              e.target.value
            )
          }
        />
      </div>

      <div className="profile-input-group">
        <label>
          GitHub
        </label>

        <input
          type="text"
          value={github}
          onChange={(e)=>
            setGithub(
              e.target.value
            )
          }
        />
      </div>

      <div className="profile-input-group">
        <label>
          LinkedIn
        </label>

        <input
          type="text"
          value={linkedin}
          onChange={(e)=>
            setLinkedin(
              e.target.value
            )
          }
        />
      </div>

    </div>

    <button
      className="save-profile-btn"
      onClick={async()=>{

        await saveProfile();

        setIsEditing(false);

      }}
    >
      Save Profile
    </button>

  </div>
}
        <div className="profile-applications">

          <h2>
            Recent Applications
          </h2>

          {
            recentCompanies.map(
              (item) => (

              <div
                key={item._id}
                className="recent-card"
              >

                <div>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {
                      item.appliedDate ||
                      "No Date"
                    }
                  </p>

                </div>

                <span
                  className={`status ${item.status}`}
                >
                  {item.status}
                </span>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );
};

export default Profile;