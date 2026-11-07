import React, { useState, useEffect } from "react";
import "../styles/TechStack.css";
import { api } from "../services/api";

const TechStack = () => {

  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [techList, setTechList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await api.getTechnologies();
        setTechList(data.map(t => t.name));
      } catch (error) {
        console.error("Failed to fetch technologies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  const showTech = async (name) => {
    setSearch(name);
    try {
      const data = await api.getTechnology(name);
      setResult(data);
    } catch (error) {
      console.error("Failed to fetch technology:", error);
      setResult({
        category: "Unknown",
        popularity: 60,
        companies: ["Data not available"]
      });
    }
  };

  const handleSearch = async () => {
    const key = search.toLowerCase();
    try {
      const data = await api.getTechnology(key);
      setResult(data);
    } catch (error) {
      setResult({
        category: "Unknown",
        popularity: 60,
        companies: ["Data not available"]
      });
    }
  };

  return (

    <div className="tech-page">

      <h1 className="tech-title">
        Tech Stack Popularity
      </h1>


      {/* search */}

      <div className="search-area">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter technology"
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>


      {/* buttons */}

      <div className="tech-list">

        {techList.map((t) => (

          <button
            key={t}
            className="tech-btn"
            onClick={() => showTech(t)}
          >
            {t.toUpperCase()}
          </button>

        ))}

      </div>


      {/* result */}

      {result && (

        <div className="result-box">

          <h2>Category : {result.category}</h2>

          <h2>Popularity</h2>

          <div className="bar">

            <div
              className="fill"
              style={{ width: result.popularity + "%" }}
            >
              {result.popularity}%
            </div>

          </div>


          <h2>Companies Using</h2>

          <div className="company-box">

            {result.companies.map((c, i) => (

              <div key={i} className="company-item">
                {c}
              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );
};

export default TechStack;
