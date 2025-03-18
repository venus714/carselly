import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css'; // Ensure this file exists and is correctly placed

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar-menu">
        <Link to="/home" className="navbar-brand">Car Marketplace</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/cars" className="nav-link">Cars</Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">Add Car</Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">Post</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
