import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const SignUpForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    // Add logic to handle signup form submission
  };

  return (
    <section className="signup-section-container">
      <div className="signup-card">
        <div className="signup-image-container">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp"
            alt="signup form"
          />
        </div>
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <div className="signup-logo-container">
              <i className="fas fa-cubes fa-2x"></i>
            </div>
            <h5>Create your account</h5>
            <div className="signup-form-outline">
              <input type="text" id="signupName" required />
              <label htmlFor="signupName">Full Name</label>
            </div>
            <div className="signup-form-outline">
              <input type="email" id="signupEmail" required />
              <label htmlFor="signupEmail">Email address</label>
            </div>
            <div className="signup-form-outline">
              <input type="password" id="signupPassword" required />
              <label htmlFor="signupPassword">Password</label>
            </div>
            <div className="signup-form-outline">
              <input type="password" id="signupConfirmPassword" required />
              <label htmlFor="signupConfirmPassword">Confirm Password</label>
            </div>
            <div className="pt-1 mb-4">
              <button type="submit" className="signup-btn-block">
                Sign Up
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
            <a href="#!">Terms of use.</a>
            <a href="#!">Privacy policy</a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
