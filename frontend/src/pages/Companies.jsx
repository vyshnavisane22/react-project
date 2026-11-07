import React, { useState, useEffect } from "react";
import "../styles/Companies.css";
import { api } from "../services/api";

const Companies = () => {

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await api.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);


  // get unique cities
  const cities = [...new Set(companies.map(c => c.location).filter(Boolean))];


  const handleSearch = () => {
    setSelectedCity(city);
  };


  const showCity = (c) => {
    setSelectedCity(c);
  };


  const filtered = companies.filter(c =>
    c.location && c.location.toLowerCase().includes(selectedCity.toLowerCase())
  );


  return (

    <div className="companies-page">

      <h1 className="companies-title">
        Companies By City
      </h1>


      {/* search */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={handleSearch}>
          Find
        </button>

      </div>


      {/* city options */}

      <div className="city-list">

        {cities.map((c, i) => (

          <button
            key={i}
            className="city-btn"
            onClick={() => showCity(c)}
          >
            {c}
          </button>

        ))}

      </div>


      {/* result */}

      {selectedCity && (

        <div className="result-box">

          <h2>
            IT Companies in {selectedCity}
          </h2>

          {loading ? (

            <p>Loading companies...</p>

          ) : filtered.length === 0 ? (

            <p>No companies found</p>

          ) : (

            <ul>

              {filtered.map((c) => (

                <li key={c.id}>
                  <b>{c.name}</b> — {c.desc}
                </li>

              ))}

            </ul>

          )}

        </div>

      )}

    </div>

  );
};

export default Companies;