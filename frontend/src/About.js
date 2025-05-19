import React from "react";
import { FaQuestionCircle, FaInfoCircle, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-content">
        <h1>About Car Listings</h1>
        <p>
          Welcome to Car Listings, your trusted platform to find the best cars at
          competitive prices. We strive to provide a seamless and enjoyable experience for car buyers and sellers.
        </p>
        <p>
          Our mission is to connect car enthusiasts, buyers, and dealers by offering a user-friendly platform with detailed car information, filtering options, and great customer support.
        </p>
         <div className="video-container">
        <h2>Watch Our Introduction Video</h2>
        <iframe
          width="360"
          height="215"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-links">
          <div className="footer-column">
            <h4><FaQuestionCircle /> Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4><FaInfoCircle /> About Us</h4>
            <ul>
              <li><a href="#company">Company Info</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Car Listings. All rights reserved.</p>
      </footer>

      {/* YouTube Video Section */}
     
    </div>
  );
};

export default AboutPage;
