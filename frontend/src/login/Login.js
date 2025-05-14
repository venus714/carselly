import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../login/LoginForm.css";
import { useAuth } from "../AuthContext"; // 👈 Add this

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 Access login function

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:3000/login", {
        user: { email, password },
      });

      if (response.status === 202) {
        const token = response.data.jwt;
        login(token); // 👈 Set auth token in context
        navigate("/home");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  };

  return (
    <section className="section-container">
      <div className="card">
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/5680754/pexels-photo-5680754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="login form"
          />
        </div>
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <div className="logo-container">
              <i className="fas fa-cubes fa-2x"></i>
            </div>
            <h5>Sign into your account</h5>
            {error && <p className="error-message">{error}</p>}
            <div className="form-outline">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-outline">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="pt-1 mb-4">
              <button type="submit" className="btn-block">
                Login
              </button>
            </div>
            <a href="#!">Forgot password?</a>
            <p>
              Don't have an account? <Link to="/signup">Register here</Link>
            </p>
            <a href="#!">Terms of use.</a>
            <a href="#!">Privacy policy</a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
