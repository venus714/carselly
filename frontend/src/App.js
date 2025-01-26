import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./login/Login";
import SignUpForm from "../src/signup/Signup";
import CarCard from "./Car/CarCard";
import CarForm from "./Car/CarForm";
import CarList from "./Car/CarList";  // Import the CarList component to view all cars
import "./Car/style.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/cars" element={<CarList />} /> {/* Route to view all cars */}
          <Route path="/add" element={<CarForm />} /> {/* Route to add a car */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
