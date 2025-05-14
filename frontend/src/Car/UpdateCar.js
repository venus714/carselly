// UpdateCar.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Car/Update.css'; // Optional: for styling

const API_URL = "http://127.0.0.1:3000";

const UpdateCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/posts/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch car details");
        const data = await response.json();
        setCar(data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/posts/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update car");

      alert("Car updated successfully!");
      navigate(`/cars/${carId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!car) return <p>Loading car details...</p>;

  return (
    <div className="update-car-container">
      <h2>Update Car Listing</h2>
      <form className="update-car-form" onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required />
        </label>

        <label>Model:
          <input type="text" name="model" value={formData.model || ''} onChange={handleChange} />
        </label>

        <label>Year of Manufacture:
          <input type="number" name="year_of_manufacture" value={formData.year_of_manufacture || ''} onChange={handleChange} />
        </label>

        <label>Condition:
          <input type="text" name="condition" value={formData.condition || ''} onChange={handleChange} />
        </label>

        <label>Mileage (km):
          <input type="number" name="mileage" value={formData.mileage || ''} onChange={handleChange} />
        </label>

        <label>Transmission:
          <input type="text" name="transmission" value={formData.transmission || ''} onChange={handleChange} />
        </label>

        <label>Engine Size (CC):
          <input type="number" name="engine_size" value={formData.engine_size || ''} onChange={handleChange} />
        </label>

        <label>Horse Power (HP):
          <input type="number" name="horse_power" value={formData.horse_power || ''} onChange={handleChange} />
        </label>

        <label>Fuel Type:
          <input type="text" name="fuel" value={formData.fuel || ''} onChange={handleChange} />
        </label>

        <label>Body Type:
          <input type="text" name="body" value={formData.body || ''} onChange={handleChange} />
        </label>

        <label>Color (Interior):
          <input type="text" name="color_in" value={formData.color_in || ''} onChange={handleChange} />
        </label>

        <label>Color (Exterior):
          <input type="text" name="color_out" value={formData.color_out || ''} onChange={handleChange} />
        </label>

        <label>Location:
          <input type="text" name="location" value={formData.location || ''} onChange={handleChange} />
        </label>

        <label>Price:
          <input type="number" name="price" value={formData.price || ''} onChange={handleChange} />
        </label>

        <label>Contact:
          <input type="text" name="contact" value={formData.contact || ''} onChange={handleChange} />
        </label>

        <label>Your Name:
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
        </label>

        <label>Description:
          <textarea name="description" value={formData.description || ''} onChange={handleChange}></textarea>
        </label>

        <label>Registered:
          <select name="registered" value={formData.registered || false} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateCar;
