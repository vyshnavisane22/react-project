import React, { useState, useEffect } from "react";
import "../styles/CompanyDirectory.css";
import { api } from "../services/api";

const CompanyDirectory = () => {

  const [company, setCompany] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await api.getCompanyDirectory();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = () => {
    setSearchCompany(company);
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchCompany.toLowerCase())
  );

  return (
    <div className="company-directory-page">

      <h1 className="title">Company Directory</h1>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* COMPANY CARDS */}
      <div className="card-container">

        {loading ? (
          <p>Loading companies...</p>
        ) : filteredCompanies.length === 0 ? (
          <p>No companies found</p>
        ) : (
          filteredCompanies.map((c) => (
            <div key={c.id} className="card">

              <h3>{c.name}</h3>

              <p><b>Founder:</b> {c.founder}</p>

              <p><b>History:</b> {c.history}</p>

              <p><b>Location:</b> {c.location}</p>

              <p><b>Total Employees:</b> {c.employees}</p>

              <p><b>Salary Details:</b> {c.salary}</p>

              <p><b>Used Technologies:</b> {c.technologies}</p>

              <p><b>Available Jobs:</b> {c.jobs}</p>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default CompanyDirectory;
