import React from "react";
import { Link } from "react-router-dom";
import "../home/home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Car Marketplace</h1>
        <p className="hero-description">Buy and sell cars seamlessly with the best deals and trusted sellers.</p>
        <Link to="/cars">
          <button className="primary-btn">Browse Cars</button>
        </Link>
      </header>

      <section className="features-section">
        <div className="feature">
          <h3>Sell Your Car</h3>
          <p>Easily list your car and reach thousands of potential buyers.</p>
          <Link to="/posts">
            <button className="secondary-btn">Sell Now</button>
          </Link>
        </div>
        <div className="feature">
          <h3>Buy a Car</h3>
          <p>Explore a wide range of cars at unbeatable prices.</p>
          <Link to="/cars">
            <button className="secondary-btn">Explore Cars</button>
          </Link>
        </div>
      </section>
      <section className="benefits-section">
  <h2>Why Choose Us?</h2>
  <div className="benefits-container">
    <div className="benefit">
      <i className="fas fa-car-side fa-2x benefit-icon"></i>
      <h4>Wide Selection</h4>
      <p>Choose from a vast inventory of new and used cars.</p>
    </div>
    <div className="benefit">
      <i className="fas fa-shield-alt fa-2x benefit-icon"></i>
      <h4>Secure Transactions</h4>
      <p>Enjoy safe and transparent transactions every time.</p>
    </div>
    <div className="benefit">
      <i className="fas fa-tags fa-2x benefit-icon"></i>
      <h4>Best Deals</h4>
      <p>Get the best value whether buying or selling.</p>
    </div>
  </div>
</section>

<section className="comments-section">
  <h2>What Our Users Say</h2>
  <div className="comments-container">
    <div className="comment">
      <i className="fas fa-quote-left fa-lg comment-icon"></i>
      <p className="comment-text">"I sold my car in just two days! Highly recommended platform!"</p>
      <p className="comment-author">– Alex M.</p>
    </div>
    <div className="comment">
      <i className="fas fa-quote-left fa-lg comment-icon"></i>
      <p className="comment-text">"Great deals and an easy-to-use interface. Love it!"</p>
      <p className="comment-author">– Brenda K.</p>
    </div>
    <div className="comment">
      <i className="fas fa-quote-left fa-lg comment-icon"></i>
      <p className="comment-text">"Customer service was prompt and helpful during the process."</p>
      <p className="comment-author">– David W.</p>
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
