// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./login/Login";
import SignUpForm from "./signup/Signup";
import CarCard from "./Car/CarCard";
import Home from "./home/Home";
import "./Car/style.css";
import Navbar from "./Navbar/navbar";
import Posts from "./posts/Posts";
import CarDetails from "./Car/CarDetails";
import Packages from "./packages/Packages";
import UpdateCar from "./Car/UpdateCar";
import ProtectedRoute from "./ProtectedRoute.js";
import AboutPage from "./About.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/cars" element={<CarCard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/cars/:carId/UpdateCar" element={<UpdateCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
