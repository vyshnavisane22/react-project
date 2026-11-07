import React, { useState, useEffect } from "react";
import "../styles/Roles.css";
import { api } from "../services/api";

function Roles() {

  const [roleInput, setRoleInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await api.getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const searchRole = async (role) => {
    if (!role) return;
    try {
      const data = await api.getJobs(role);
      setSelectedRole(role);
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    }
  };

  return (

    <div className="roles-page">

      <h1 className="roles-title">
        Search Job Role
      </h1>


      {/* search box */}

      <div className="search-area">

        <input
          type="text"
          placeholder="Enter role"
          value={roleInput}
          onChange={(e)=>setRoleInput(e.target.value)}
        />

        <button
          onClick={()=>searchRole(roleInput)}
        >
          Search
        </button>

      </div>


      {/* role buttons */}

      <div className="roles-list">

        {roles.map((r,i)=>(
          <button
            key={i}
            className="role-btn"
            onClick={()=>searchRole(r)}
          >
            {r}
          </button>
        ))}

      </div>



      {/* result table */}

      {selectedRole && jobs.length>0 && (

        <table className="result-table">

          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Rating</th>
              <th>Type</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>

            {jobs.map((j,i)=>(
              <tr key={j.id || i}>
                <td>{j.companyName}</td>
                <td>{j.role}</td>
                <td>{j.salary}</td>
                <td>{"⭐".repeat(j.rating)}</td>
                <td>{j.type}</td>
                <td>{j.location}</td>
              </tr>
            ))}

          </tbody>

        </table>

      )}


      {selectedRole && jobs.length===0 && (
        <h2>No companies found</h2>
      )}

    </div>
  );
}

export default Roles;
