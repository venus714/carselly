import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import SignUpForm from "../signup/Signup";

const LoginForm = () => {
  return (
    <section className="section-container">
      <div className="card">
        <div className="image-container">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
          />
        </div>
        <div className="form-container">
          <form>
            <div className="logo-container">
              <i className="fas fa-cubes fa-2x"></i>
            </div>
            <h5>Sign into your account</h5>
            <div className="form-outline">
              <input type="email" id="form2Example17" />
              <label htmlFor="form2Example17">Email address</label>
            </div>
            <div className="form-outline">
              <input type="password" id="form2Example27" />
              <label htmlFor="form2Example27">Password</label>
            </div>
            <div className="pt-1 mb-4">
              <button type="button" className="btn-block">
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
