import React, { useState, useRef } from "react";
import "./Posts.css";

const API_URL = "http://127.0.0.1:3000";

function Posts() {
  const [postData, setPostData] = useState({
    title: "",
    model: "",
    year_of_manufacture: "",
    condition: "",
    color_in: "",
    color_out: "",
    registered: "",
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

  const [images, setImages] = useState([]);
  const imagesRef = useRef();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!postData.title.trim()) {
      alert("Please enter a title.");
      return;
    }

    const selectedFiles = imagesRef.current.files;

    if (!selectedFiles || selectedFiles.length < 3) {
      alert("Please select at least 3 images.");
      return;
    }

    const formData = new FormData();

    Object.keys(postData).forEach((key) => {
      formData.append(`post[${key}]`, postData[key]);
    });

    Array.from(selectedFiles).forEach((file) => {
      formData.append("post[images][]", file);
    });

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      alert("Post uploaded successfully!");

      setPostData({
        title: "",
        model: "",
        year_of_manufacture: "",
        condition: "",
        color_in: "",
        color_out: "",
        registered: "",
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

      imagesRef.current.value = "";
      getImages();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload post. Please try again.");
    }
  };

  const getImages = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="upload-form">
      <h2>Create Post</h2>
      <form encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" value={postData.title} onChange={handleChange} />
        <input type="text" name="model" placeholder="Model" value={postData.model} onChange={handleChange} />
        <input type="number" name="year_of_manufacture" placeholder="Year of Manufacture" value={postData.year_of_manufacture} onChange={handleChange} />
        <input type="text" name="condition" placeholder="Condition" value={postData.condition} onChange={handleChange} />
        <input type="text" name="color_in" placeholder="Interior Color" value={postData.color_in} onChange={handleChange} />
        <input type="text" name="color_out" placeholder="Exterior Color" value={postData.color_out} onChange={handleChange} />
        <input type="text" name="registered" placeholder="Registered" value={postData.registered} onChange={handleChange} />
        <input type="number" name="mileage" placeholder="Mileage" value={postData.mileage} onChange={handleChange} />
        <input type="text" name="transmission" placeholder="Transmission" value={postData.transmission} onChange={handleChange} />
        <input type="text" name="body" placeholder="Body Type" value={postData.body} onChange={handleChange} />
        <input type="text" name="fuel" placeholder="Fuel Type" value={postData.fuel} onChange={handleChange} />
        <input type="number" name="engine_size" placeholder="Engine Size (cc)" value={postData.engine_size} onChange={handleChange} />
        <input type="number" name="horse_power" placeholder="Horse Power" value={postData.horse_power} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={postData.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={postData.price} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={postData.location} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Information" value={postData.contact} onChange={handleChange} />
        <input type="text" name="name" placeholder="Your Name" value={postData.name} onChange={handleChange} />

        <label>Upload Images (Minimum 3):</label>
        <input type="file" name="images" multiple ref={imagesRef} accept="image/*" />

        <button type="button" onClick={handleUpload}>
          Submit Post
        </button>
      </form>

      <h2>Uploaded Images</h2>
      <div className="images">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`uploaded-${index}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
            />
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Posts;
