import React from "react";
import "../CompanyCard.css";

const CompanyCard = (props) => {

  return (

    <div className="company-card">

      <div className="company-top">

        <h2>
          {props.name}
        </h2>

        <span
          className={`company-status ${props.status}`}
        >
          {props.status}
        </span>

      </div>

      <div className="company-info">

        <p>
          📅 Applied Date
        </p>

        <span>
          {props.appliedDate || "Not Provided"}
        </span>

      </div>

      <div className="company-info">

        <p>
          📝 Notes
        </p>

        <span>
          {props.notes || "No Notes"}
        </span>

      </div>

      <div className="company-actions">

        <select
          value={props.status}
          onChange={(e)=>
            props.updateStatus(
              props.id,
              e.target.value
            )
          }
        >
          <option>
            Applied
          </option>

          <option>
            Interview
          </option>

          <option>
            Selected
          </option>

          <option>
            Rejected
          </option>

        </select>

        <button
          className="delete-btn"
          onClick={()=>
            props.deletecompany(
              props.id
            )
          }
        >
          Delete
        </button>

      </div>

    </div>

  );
};

export default CompanyCard;