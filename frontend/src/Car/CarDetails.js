import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CarDetails.css';

const API_URL = "http://127.0.0.1:3000";

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${carId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCar(data);
        setCurrentImageIndex(0);
        setError(null);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err.message);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const response = await fetch(`${API_URL}/posts/${carId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete car");
      }
      alert("Car deleted successfully!");
      navigate("/cars");
    } catch (err) {
      console.error("Error deleting car:", err);
      setError("Failed to delete car");
    }
  };

  const handleUpdate = () => {
    navigate(`/cars/${carId}/edit`);
  };

  const handlePrevImage = () => {
    if (!car || !car.images.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    if (!car || !car.images.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!car) return <p>Loading car details...</p>;

  return (
    <div className="car-details-container">
      <h2>{car.title}</h2>

      {car.images?.length > 0 ? (
        <div className="car-details-slider">
          <button className="slider-btn" onClick={handlePrevImage}>❮</button>
          <img
            src={car.images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className="slider-image"
          />
          <button className="slider-btn" onClick={handleNextImage}>❯</button>
        </div>
      ) : (
        <p>No images available</p>
      )}

<div className="car-details-info">
  <div className="info-section">
    <p><strong>Model:</strong> {car.model}</p>
    <p><strong>Year of Manufacture:</strong> {car.year_of_manufacture}</p>
    <p><strong>Condition:</strong> {car.condition}</p>
    <p><strong>Registered:</strong> {car.registered ? "Yes" : "No"}</p>
  
    <p><strong>Description:</strong> {car.description}</p>
  </div>

  <div className="info-section">
    <p><strong>Transmission:</strong> {car.transmission}</p>
    <p><strong>Mileage:</strong> {car.mileage} km</p>
    <p><strong>Engine Size:</strong> {car.engine_size} CC</p>
    <p><strong>Horse Power:</strong> {car.horse_power} HP</p>
    <p><strong>Body Type:</strong> {car.body}</p>
    <p><strong>Fuel Type:</strong> {car.fuel}</p>
  </div>

  <div className="info-section">
  <p className="car-price"><strong>Price:</strong> ${car.price}</p>
    <p><strong>Color (Interior):</strong> {car.color_in}</p>
    <p><strong>Color (Exterior):</strong> {car.color_out}</p>
    <p><strong>Location:</strong> {car.location}</p>
    <p><strong>Contact:</strong> {car.contact} ({car.name})</p>
  </div>
  <div className="info-section safety-tips">
  <h3>Safety Tips</h3>
  <ul>
    <li>Avoid sending any prepayments</li>
    <li>Meet with the seller at a safe public place</li>
    <li>Inspect what you're going to buy to make sure it's what you need</li>
    <li>Check all the documents and only pay if you're satisfied</li>
  </ul>
  
  <div className="post-ad-button-container">
  <button className="post-ad-button" onClick={() => navigate("/posts ")}>
    Post similar Ad
  </button>
</div>

</div>

</div>


      <div className="car-details-actions">
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      <footer className="footer-section">
<p>&copy; 2025 Car Marketplace. All rights reserved.</p>
</footer>
</div>
  );
};
export default CarDetails;
