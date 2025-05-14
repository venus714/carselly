import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Posts.css";

const API_URL = "http://127.0.0.1:3000";

function Posts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");  // Changed from 'token' to 'authToken'
  const [postData, setPostData] = useState({
    title: "", model: "", year_of_manufacture: "", condition: "", color_in: "", color_out: "",
    registered: "", mileage: "", transmission: "", body: "", fuel: "", engine_size: "",
    horse_power: "", description: "", price: "", location: "", contact: "", name: "",
  });

  const [images, setImages] = useState([]);
  const imagesRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const selectedFiles = imagesRef.current.files;

    if (!postData.title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!selectedFiles || selectedFiles.length < 3) {
      alert("Please select at least 3 images.");
      return;
    }

    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      formData.append(`post[${key}]`, value);
    });

    Array.from(selectedFiles).forEach((file) => {
      formData.append("post[images][]", file);
    });

    try {
      // Check if token is available before making the request
      if (!token) {
        alert("You are not logged in. Please log in to upload a post.");
        navigate("/login");  // Redirect to login page if no token is found
        return;
      }

      const response = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Post uploaded successfully!");
      setPostData({
        title: "", model: "", year_of_manufacture: "", condition: "", color_in: "", color_out: "",
        registered: "", mileage: "", transmission: "", body: "", fuel: "", engine_size: "",
        horse_power: "", description: "", price: "", location: "", contact: "", name: "",
      });
      imagesRef.current.value = "";
      fetchImages();

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Please log in again.");
        localStorage.removeItem("authToken");  // Clear token from localStorage
        navigate("/login");  // Redirect to login page if token is invalid
      } else {
        console.error("Upload failed:", error);
        alert("Failed to upload post. Please try again.");
      }
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      if (response.data.images) {
        setImages(response.data.images);
      }
    } catch (error) {
      console.error("Fetching images failed:", error);
    }
  };

  const handleSelectPackage = () => {
    const selectedFiles = imagesRef.current.files;

    if (!selectedFiles || selectedFiles.length < 3) {
      alert("Please select at least 3 images.");
      return;
    }

    localStorage.setItem("pendingPostData", JSON.stringify(postData));
    localStorage.setItem("pendingPostImagesCount", selectedFiles.length);

    Array.from(selectedFiles).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(`pendingImage${index}`, reader.result);
      };
      reader.readAsDataURL(file);
    });

    navigate("/packages");
  };

  return (
    <>
      <div className="upload-form">
        <h2>Create Post</h2>
        <form onSubmit={handleUpload} encType="multipart/form-data">
          {[
            { name: "title", type: "text", placeholder: "Title" },
            { name: "model", type: "text", placeholder: "Model" },
            { name: "year_of_manufacture", type: "number", placeholder: "Year of Manufacture" },
            { name: "condition", type: "text", placeholder: "Condition" },
            { name: "color_in", type: "text", placeholder: "Interior Color" },
            { name: "color_out", type: "text", placeholder: "Exterior Color" },
            { name: "registered", type: "text", placeholder: "Registered" },
            { name: "mileage", type: "number", placeholder: "Mileage" },
            { name: "transmission", type: "text", placeholder: "Transmission" },
            { name: "body", type: "text", placeholder: "Body Type" },
            { name: "fuel", type: "text", placeholder: "Fuel Type" },
            { name: "engine_size", type: "number", placeholder: "Engine Size (cc)" },
            { name: "horse_power", type: "number", placeholder: "Horse Power" },
            { name: "price", type: "number", placeholder: "Price" },
            { name: "location", type: "text", placeholder: "Location" },
            { name: "contact", type: "text", placeholder: "Contact Information" },
            { name: "name", type: "text", placeholder: "Your Name" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={postData[field.name]}
              onChange={handleChange}
            />
          ))}
          <textarea
            name="description"
            placeholder="Description"
            value={postData.description}
            onChange={handleChange}
          />

          <label>Upload Images (Minimum 3):</label>
          <input type="file" multiple ref={imagesRef} accept="image/*" />

          <button type="button" onClick={handleSelectPackage} className="select-package-button">
            Select Package
          </button>
          <button type="submit">Submit Post</button>
        </form>

        <div className="sell-steps-horizontal">
          <h3>Sell Your Car in 4 Simple Steps</h3>
          <div className="steps-container">
            {[
              { icon: "fas fa-car", title: "Step 1", desc: "Enter Car Details" },
              { icon: "fas fa-camera", title: "Step 2", desc: "Upload Car Photos" },
              { icon: "fas fa-tags", title: "Step 3", desc: "Select Package" },
              { icon: "fas fa-bullhorn", title: "Step 4", desc: "Post Your Ad" },
            ].map((step, idx) => (
              <div className="step-box" key={idx}>
                <i className={step.icon}></i>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Uploaded Images</h2>
        <div className="images">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img key={index} src={img} alt={`uploaded-${index}`} style={{ width: "100px", height: "100px", margin: "5px" }} />
            ))
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </div>
      </div>

      <footer className="footer-section">
        <p>&copy; 2025 Car Marketplace. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Posts;
