import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarCard.css";

const API_URL = "http://127.0.0.1:3000";

const CarCard = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCars(data);
        setError(null);
      } catch (err) {
        console.error("Fetching error:", err);
        setError(err.message);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  // Handle Delete
  const handleDelete = async (carId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${carId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete car");
      }
      setCars(cars.filter((car) => car.id !== carId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete the car.");
    }
  };

  // Handle Update
  const handleUpdate = (carId) => {
    navigate(`/update-car/${carId}`); // Navigate to the update page
  };

  // Navigate to the detailed page
  const handleClickImage = (carId) => {
    navigate(`/cars/${carId}`); // Navigate to detailed page
  };

  return (
    <div className="car-card-container">
      <h2>Car Listings</h2>

      {error && <p className="error-message">{error}</p>}

      {cars.length > 0 ? (
        cars.map((car) => (
          <div key={car.id} className="car-card">
          <div className="car-image-container">
            {car?.images?.length > 0 ? (
              <img
                src={car.images[0]}
                alt={car?.model || "Car Image"}
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
    </div>
  );
};

export default CarCard;
