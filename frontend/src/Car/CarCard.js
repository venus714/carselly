import React, { useState, useEffect } from "react";
import "./CarCard.css";

const API_URL = "http://127.0.0.1:3000";

const CarCard = () => {
  const [cars, setCars] = useState([]); // Change from single object to array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_URL}/possts`); 
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCars(data); // Expecting an array now
        setError(null);
      } catch (err) {
        console.error("Fetching error:", err);
        setError(err.message);
        setCars([]);
      }
    };
    
    fetchCars();
  }, []);

  return (
    <div className="car-card-container">
      <h2>Car Listings</h2>

      {error && <p className="error-message">{error}</p>}

      {cars.length > 0 ? (
        cars.map((car, index) => (
          <div key={index} className="car-card">
            {car?.images?.length > 0 ? (
              <div className="car-images">
                {car.images.map((image, idx) => (
                  <img key={idx} src={image} alt={car?.model || "Car Image"} className="car-image" />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}

            <h2>{car.title}</h2>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year of Manufacture:</strong> {car.year_of_manufacture}</p>
            <p><strong>Condition:</strong> {car.condition}</p>
            <p><strong>Color (Interior):</strong> {car.color_in}</p>
            <p><strong>Color (Exterior):</strong> {car.color_out}</p>
            <p><strong>Registered:</strong> {car.registered ? "Yes" : "No"}</p>
            <p><strong>Mileage:</strong> {car.mileage} km</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Body Type:</strong> {car.body}</p>
            <p><strong>Fuel Type:</strong> {car.fuel}</p>
            <p><strong>Engine Size:</strong> {car.engine_size} CC</p>
            <p><strong>Horse Power:</strong> {car.horse_power} HP</p>
            <p><strong>Description:</strong> {car.description}</p>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Location:</strong> {car.location}</p>
            <p><strong>Contact:</strong> {car.contact} ({car.name})</p>
          </div>
        ))
      ) : (
        <p>No cars available</p>
      )}
    </div>
  );
};

export default CarCard;
