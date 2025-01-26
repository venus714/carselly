import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <h3>{car.model}</h3>
      <p><strong>Year of Manufacture:</strong> {car.Year_of_manufucture}</p>
      <p><strong>Condition:</strong> {car.condition}</p>
      <p><strong>Price:</strong> {car.price}</p>
      <p><strong>Description:</strong> {car.description}</p>
      {/* Add other car details you want to show here */}
    </div>
  );
};

export default CarCard;
