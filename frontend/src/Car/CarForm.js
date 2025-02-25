import React, { useState } from "react";
import axios from "axios";

const CarForm = ({ fetchCars }) => {
  const initialFormData = {
    model: "",
    Year_of_manufucture: "",
    condition: "",
    color_in: "",
    color_out: "",
    registered: "",
    milage: "",
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
    email: "",
    password_digest: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [carImage, setCarImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (carImage) {
      data.append("image", carImage);
    }

    try {
      await axios.post("http://127.0.0.1:3000/carr", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCars(); // Refresh the car list after submission
      setFormData(initialFormData); // Reset form
      setCarImage(null); // Reset image input
      alert("Car details successfully submitted!");
    } catch (error) {
      console.error("Error submitting car data:", error);
      alert("Failed to submit car details. Please try again.");
    }
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <h2>Add Car</h2>
      <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" />
      <input type="text" name="Year_of_manufucture" value={formData.Year_of_manufucture} onChange={handleChange} placeholder="Year of Manufacture" />
      <input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="Condition" />
      <input type="text" name="color_in" value={formData.color_in} onChange={handleChange} placeholder="Color Inside" />
      <input type="text" name="color_out" value={formData.color_out} onChange={handleChange} placeholder="Color Outside" />
      <input type="text" name="registered" value={formData.registered} onChange={handleChange} placeholder="Registered" />
      <input type="text" name="milage" value={formData.milage} onChange={handleChange} placeholder="Mileage" />
      <input type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission" />
      <input type="text" name="body" value={formData.body} onChange={handleChange} placeholder="Body" />
      <input type="text" name="fuel" value={formData.fuel} onChange={handleChange} placeholder="Fuel" />
      <input type="text" name="engine_size" value={formData.engine_size} onChange={handleChange} placeholder="Engine Size" />
      <input type="text" name="horse_power" value={formData.horse_power} onChange={handleChange} placeholder="Horse Power" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password_digest" value={formData.password_digest} onChange={handleChange} placeholder="Password" />

      {/* Image Upload Field */}
      <input type="file" name="image" onChange={handleImageChange} accept="image/*" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CarForm;
