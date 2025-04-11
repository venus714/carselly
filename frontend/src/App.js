import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./login/Login";
import SignUpForm from "../src/signup/Signup";
import CarCard from "./Car/CarCard";
// import CarForm from "./Car/CarForm";
import Home from "./home/Home";
import "./Car/style.css"
import Navbar from "../src/Navbar/navbar";
import Posts from "./posts/Posts";
import CarDetails from "./Car/CarDetails";



function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/cars" element={<CarCard />} /> {/* Route to view all cars */}
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/home" element={<Home />} /> {/* Route */}
         < Route path="/posts" element={<Posts />} /> {/* Route */}
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;

