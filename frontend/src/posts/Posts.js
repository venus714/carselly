import React, { useState, useRef } from "react";

const API_URL = "http://127.0.0.1:3000";

function Posts() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState(""); // Added state for title
  const imagesRef = useRef();
  const postToGet = useRef(1);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!imagesRef.current.files.length) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("post[title]", title); // Use user-provided title

    for (let i = 0; i < imagesRef.current.files.length; i++) {
      formData.append("post[images][]", imagesRef.current.files[i]);
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", data);
      getImages(); // Refresh images after upload
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const getImages = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/${postToGet.current.value}`);
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  return (
    <div className="upload-form">
      {/* Upload title and images */}
      <form encType="multipart/form-data">
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" name="image" multiple ref={imagesRef} />
        <button type="button" onClick={handleUpload}>
          Submit
        </button>
      </form>

      {/* Retrieve images */}
      <div>
        <input type="number" ref={postToGet} placeholder="ID to retrieve" />
        <button onClick={getImages}>Get Images</button>
      </div>

      {/* Display images */}
      <div className="images">
        {images.map((image, index) => (
          <img key={index} src={image} alt="uploaded" style={{ width: "100px", height: "100px" }} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
