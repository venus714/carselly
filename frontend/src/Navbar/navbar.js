import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../Navbar/navbar.css"; // Adjust the path as necessary

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/cars">Cars</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/about">About</Link>

      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}

      {isAuthenticated && (
        <button onClick={handleLogout}>Sign Out</button>
      )}
    </nav>
  );
}

export default Navbar;
