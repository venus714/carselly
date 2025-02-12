import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../signup/Signup.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:3000/register", {
        user: {
          username,
          email,
          password,
        },
      });

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after a success message
        }, 2000);
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Error during signup:", error);
    }
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
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="signup-form-outline">
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="username">Full Name</label>
            </div>
            <div className="signup-form-outline">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="signup-form-outline">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="signup-form-outline">
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
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
