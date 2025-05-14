import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarCard.css";

const API_URL = "http://127.0.0.1:3000";

const CarCard = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [error, setError] = useState(null);
  const [modelFilter, setModelFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const navigate = useNavigate();

  // ✅ Function to fetch all car posts
  const fetchCars = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ✅ Apply filters whenever filters or cars change
  useEffect(() => {
    let filtered = [...cars];

    if (modelFilter) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(modelFilter.toLowerCase())
      );
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((car) => car.price >= min && car.price <= max);
    }

    if (yearFilter) {
      filtered = filtered.filter(
        (car) => car.year_of_manufacture.toString() === yearFilter
      );
    }

    setFilteredCars(filtered);
  }, [cars, modelFilter, priceFilter, yearFilter]);

  // ✅ Delete car by ID
  const handleDelete = async (carId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete the car.");
    }
  };

  // ✅ Navigate to update form
  const handleUpdate = (carId) => {
    navigate(`/cars/${carId}`);
  };

  // ✅ Navigate to detailed page
  const handleClickImage = (carId) => {
    navigate(`/cars/${carId}`);
  };

  // ✅ Create unique model/year options
  const uniqueModels = [...new Set(cars.map((car) => car.model))];
  const uniqueYears = [...new Set(cars.map((car) => car.year_of_manufacture))];

  return (
    <div className="car-card-container">
      <h2>Car Listings</h2>

      {error && <p className="error-message">{error}</p>}

      {/* Filters */}
      <div className="filters">
        <select value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
          <option value="">All Models</option>
          {uniqueModels.map((model, idx) => (
            <option key={idx} value={model}>{model}</option>
          ))}
        </select>

        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-10000">Below $10,000</option>
          <option value="10000-20000">$10,000 - $20,000</option>
          <option value="20000-50000">$20,000 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
        </select>

        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="">All Years</option>
          {uniqueYears.sort((a, b) => b - a).map((year, idx) => (
            <option key={idx} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Car List */}
      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              {car?.images?.length > 0 ? (
                <img
                  src={car.images[0]}
                  alt={car.model || "Car Image"}
                  className="car-image"
                  onClick={() => handleClickImage(car.id)}
                />
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className="car-info">
              <h3>{car.title}</h3>
              <p><strong>Price:</strong> ${car.price}</p>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Year:</strong> {car.year_of_manufacture}</p>

              <div className="car-card-actions">
                <button onClick={() => handleUpdate(car.id)} className="update-btn">Update</button>
                <button onClick={() => handleDelete(car.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No cars available</p>
      )}

      <footer className="footer-section">
        <p>&copy; 2025 Car Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CarCard;
