import React from "react";
import { Link, useLocation} from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">

      <div className="logo">
       <img src="/src/assets/logo.jpeg" alt="logo" className="logo-img"/>
        Smart Job Portal
      </div>

      <ul className="nav-links">
        <li><Link className={isActive("/")} to="/">Home</Link></li>
        <li><Link className={isActive("/jobs")} to="/jobs">Company Directory</Link></li>
        <li><Link className={isActive("/companies")} to="/companies">Companies</Link></li>
        <li><Link className={isActive("/comparison")} to="/comparison">Comparison</Link></li>
        <li><Link className={isActive("/roles")} to="/roles">Roles</Link></li>
        <li><Link className={isActive("/techstack")} to="/techstack">TechStack</Link></li>
      </ul>

      {/* RIGHT SIDE BUTTONS */}
      <div className="auth-buttons">
        <button className="nav-btn" onClick={()=>navigate("/login")}>Login</button>
        <button className="nav-btn" onClick={()=>navigate("/signup")}>Sign Up</button>
      </div>

    </nav>
  );
};

export default Navbar;