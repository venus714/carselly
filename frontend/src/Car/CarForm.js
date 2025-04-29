import React, { useState } from "react";
import axios from "axios";

const CarForm = ({ fetchCars }) => {
  const [formData, setFormData] = useState({
    model: "",
    year_of_manufacture: "",
    condition: "",
    color_in: "",
    color_out: "",
    registered: false, // Updated to boolean
    mileage: "",
    transmission: "",
    body: "",
    fuel: "",
    engine_size: "",
    horse_power: "",
    description: "",
    price: "",
    location: "",
    contact: "",
    name: "",
  });

  const [carImage, setCarImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox correctly
    }));
  };

  const handleImageChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      let value = formData[key];
      if (["price", "mileage", "engine_size", "horse_power"].includes(key)) {
        value = value ? parseInt(value, 10) : null; // Ensure integers are sent
      }
      data.append(key, value);
    });

    if (carImage) {
      data.append("image", carImage);
    }

    try {
      await axios.post("http://127.0.0.1:3000/carr", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      fetchCars();
      setFormData({
        model: "",
        year_of_manufacture: "",
        condition: "",
        color_in: "",
        color_out: "",
        registered: false,
        mileage: "",
        transmission: "",
        body: "",
        fuel: "",
        engine_size: "",
        horse_power: "",
        description: "",
        price: "",
        location: "",
        contact: "",
        name: "",
      });
      setCarImage(null);
      alert("Car details successfully submitted!");
    } catch (error) {
      console.error("Error submitting car data:", error);
      setError("Failed to submit car details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <h2>Add Car</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" required />
      <input type="number" name="year_of_manufacture" value={formData.year_of_manufacture} onChange={handleChange} placeholder="Year of Manufacture" required />
      <input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="Condition" required />
      <input type="text" name="color_in" value={formData.color_in} onChange={handleChange} placeholder="Interior Color" />
      <input type="text" name="color_out" value={formData.color_out} onChange={handleChange} placeholder="Exterior Color" />
      
      <label>
        Registered: 
        <input type="checkbox" name="registered" checked={formData.registered} onChange={handleChange} />
      </label>

      <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Mileage" />
      <input type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission Type" required />
      <input type="text" name="body" value={formData.body} onChange={handleChange} placeholder="Body Type" />
      <input type="text" name="fuel" value={formData.fuel} onChange={handleChange} placeholder="Fuel Type" required />
      <input type="number" name="engine_size" value={formData.engine_size} onChange={handleChange} placeholder="Engine Size (cc)" />
      <input type="number" name="horse_power" value={formData.horse_power} onChange={handleChange} placeholder="Horse Power" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (KES)" required />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required />
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Seller Name" required />
      <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
      <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
    </form>
  );
};
<footer className="footer-section">
<p>&copy; 2025 Car Marketplace. All rights reserved.</p>
</footer>

export default CarForm;
