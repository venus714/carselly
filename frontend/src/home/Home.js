import React from "react";
import { Link } from "react-router-dom";
import "../home/home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Car Marketplace</h1>
        <p className="hero-description">Buy and sell cars seamlessly with the best deals and trusted sellers.</p>
        <Link to="/listings">
          <button className="primary-btn">Browse Cars</button>
        </Link>
      </header>

      <section className="features-section">
        <div className="feature">
          <h3>Sell Your Car</h3>
          <p>Easily list your car and reach thousands of potential buyers.</p>
          <Link to="/sell">
            <button className="secondary-btn">Sell Now</button>
          </Link>
        </div>
        <div className="feature">
          <h3>Buy a Car</h3>
          <p>Explore a wide range of cars at unbeatable prices.</p>
          <Link to="/listings">
            <button className="secondary-btn">Explore Cars</button>
          </Link>
        </div>
      </section>

      <section className="benefits-section">
        <h2>Why Choose Us?</h2>
        <div className="benefits-container">
          <div className="benefit">
            <h4>Wide Selection</h4>
            <p>Choose from a vast inventory of new and used cars.</p>
          </div>
          <div className="benefit">
            <h4>Secure Transactions</h4>
            <p>Enjoy safe and transparent transactions every time.</p>
          </div>
          <div className="benefit">
            <h4>Best Deals</h4>
            <p>Get the best value whether buying or selling.</p>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>&copy; 2025 Car Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
