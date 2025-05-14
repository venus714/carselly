import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../Navbar/navbar.css"; // Adjust path if needed

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>
            <button onClick={handleLogout} className="logout-button">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;