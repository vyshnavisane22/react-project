import React from 'react';
import '../styles/Home.css';
const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Find The Perfect Job You Deserve</h1>
        <p>Discover opportunities that match your skills and aspirations</p>
      </section>
      
      <section className="features-section">
        <h2>Why Choose Our Platform</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Smart Matching</h3>
            <p>Complete details of IT companies including location, services, employees, branches, and company history</p>
          </div>
          <div className="feature-card">
            <h3>Company Insights</h3>
            <p>Explore available jobs from different IT companies with role, salary, location, and required skills</p>
          </div>
          <div className="feature-card">
            <h3>Technology Stack Finder</h3>
            <p>Find companies based on technologies like Java, React, Python, and more to choose the right career path</p>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <h2>Platform Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Companies</p>
          </div>
          <div className="stat-item">
            <h3>50,000+</h3>
            <p>Job Seekers</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;