import React, {
useState,
useEffect
} from "react";

import "../Settings.css";

import API from "../config";
import {
FiHome,
FiBriefcase,
FiBarChart2,
FiUser,
FiSettings,
FiLogOut,
FiLock
} from "react-icons/fi";

import {
Link,
useNavigate
} from "react-router-dom";

const Settings = () => {

const [user,setUser] =
useState({});

const [currentPassword,
setCurrentPassword] =
useState("");

const [newPassword,
setNewPassword] =
useState("");

const [confirmPassword,
setConfirmPassword] =
useState("");

const navigate =
useNavigate();

const getProfile =
async () => {


const email =
localStorage.getItem(
  "email"
);
const token =
localStorage.getItem("token");
const res =
await fetch(
  `${API}/profile/${email}`,{
    headers:{
      authorization:token
    }
  }
);

const data =
await res.json();

setUser(data);


};

useEffect(() => {


getProfile();


}, []);

const handleLogout = () => {


localStorage.removeItem(
  "token"
);

localStorage.removeItem(
  "email"
);

navigate("/");


};

const handleUpdatePassword =
async () => {


if(
  newPassword !==
  confirmPassword
){

  alert(
    "Passwords do not match"
  );

  return;

}

const email =
localStorage.getItem(
  "email"
);
const token =
localStorage.getItem("token");
const res =

await fetch(
  `${API}/change-password`,
  {
    method:"PUT",

    headers:{
      "Content-Type":
      "application/json",authorization:
      token
    },

    body:JSON.stringify({

      email,

      currentPassword,

      newPassword

    })

  }
);

const data =
await res.json();

alert(
  data.message
);

setCurrentPassword("");
setNewPassword("");
setConfirmPassword("");


};

return (

<div className="settings-layout">

  <div className="settings-sidebar">

    <div>

      <div className="settings-logo">
        🚀 Placement Tracker
      </div>

      <Link to="/dashboard">
        <div className="settings-nav">
          <FiHome />
          Dashboard
        </div>
      </Link>

      <Link to="/applications">
        <div className="settings-nav">
          <FiBriefcase />
          Applications
        </div>
      </Link>

      <Link to="/analytics">
        <div className="settings-nav">
          <FiBarChart2 />
          Analytics
        </div>
      </Link>

      <Link to="/profile">
        <div className="settings-nav">
          <FiUser />
          Profile
        </div>
      </Link>

      <Link to="/settings">
        <div className="settings-nav active">
          <FiSettings />
          Settings
        </div>
      </Link>

    </div>

  </div>

  <div className="settings-main">

    <div className="settings-header">

      <h1>
        Settings ⚙️
      </h1>

      <p>
        Manage your account
        and security settings.
      </p>

    </div>

    <div className="settings-card">

      <h2>
        Account Information
      </h2>

      <div className="info-row">

        <span>
          Name
        </span>

        <h3>
          {user.name}
        </h3>

      </div>

      <div className="info-row">

        <span>
          Email
        </span>

        <h3>
          {user.email}
        </h3>

      </div>

    </div>

    <div className="settings-card">

      <h2>
        <FiLock />
        Change Password
      </h2>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e)=>
          setCurrentPassword(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>
          setNewPassword(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>
          setConfirmPassword(
            e.target.value
          )
        }
      />

      <button
        className="update-btn"
        onClick={
          handleUpdatePassword
        }
      >
        Update Password
      </button>

    </div>

    <div className="danger-zone">

      <h2>
        Danger Zone
      </h2>

      <p>
        Logout from your account.
      </p>

      <button
        className="logout-btn"
        onClick={
          handleLogout
        }
      >
        <FiLogOut />
        Logout
      </button>

    </div>

  </div>

</div>


);

};

export default Settings;
