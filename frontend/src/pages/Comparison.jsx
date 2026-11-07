import React, { useState, useEffect } from "react";
import "../styles/Comparison.css";
import { api } from "../services/api";

function Comparison() {

  const [company1, setCompany1] = useState("");
  const [company2, setCompany2] = useState("");
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comparison, setComparison] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await api.getCompanyNames();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompare = async () => {
    if (!company1 || !company2) {
      alert("Select two companies");
      return;
    }

    setCompareLoading(true);
    setShow(true);
    setComparison(null);

    try {
      const data = await api.compareCompanies(company1, company2);
      setComparison(data);
    } catch (error) {
      console.error("Compare error:", error);
      alert(error.message || "Failed to compare companies");
    } finally {
      setCompareLoading(false);
    }
  };

  return (

    <div className="page2">

      <h1 className="title2">
        Company Comparison
      </h1>


      {/* Select boxes */}

      <div className="select-container">

        <div className="select-box">

          <h2>Company 1</h2>

          <select
            value={company1}
            onChange={(e) => setCompany1(e.target.value)}
          >
            <option value="">Select Company</option>

            {companies.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}

          </select>

        </div>


        <div className="select-box">

          <h2>Company 2</h2>

          <select
            value={company2}
            onChange={(e) => setCompany2(e.target.value)}
          >
            <option value="">Select Company</option>

            {companies.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}

          </select>

        </div>

      </div>


      {/* Compare button */}

      <button className="compare-btn" onClick={handleCompare}>
        Compare
      </button>


      {/* Result */}

      {show && (

        <div className="selected-box">

          <h2 className="selected-title">
            Selected Companies
          </h2>

          <h2 className="selected-names">
            {company1} vs {company2}
          </h2>

          {compareLoading ? (
            <p>Loading comparison...</p>
          ) : comparison ? (
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{comparison.company1.name}</th>
                  <th>{comparison.company2.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Location</td>
                  <td>{comparison.company1.location || "N/A"}</td>
                  <td>{comparison.company2.location || "N/A"}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>{comparison.company1.type || "N/A"}</td>
                  <td>{comparison.company2.type || "N/A"}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{comparison.company1.rating || "N/A"}</td>
                  <td>{comparison.company2.rating || "N/A"}</td>
                </tr>
                <tr>
                  <td>Employees</td>
                  <td>{comparison.company1.employees || "N/A"}</td>
                  <td>{comparison.company2.employees || "N/A"}</td>
                </tr>
                <tr>
                  <td>Salary</td>
                  <td>{comparison.company1.salary || "N/A"}</td>
                  <td>{comparison.company2.salary || "N/A"}</td>
                </tr>
                <tr>
                  <td>Technologies</td>
                  <td>{comparison.company1.technologies || "N/A"}</td>
                  <td>{comparison.company2.technologies || "N/A"}</td>
                </tr>
                <tr>
                  <td>Available Jobs</td>
                  <td>{comparison.company1.jobs || "N/A"}</td>
                  <td>{comparison.company2.jobs || "N/A"}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{comparison.company1.desc || "N/A"}</td>
                  <td>{comparison.company2.desc || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          ) : null}

        </div>

      )}

    </div>
  );
}

export default Comparison;
