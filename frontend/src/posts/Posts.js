import React from "react";
import { Link } from "react-router-dom";
import{useState, useRef} from "react";

const API_URL = "http://127.0.0.1:3000";

function Posts() {
  const[images, setImages] = useState([]);
  const imagesRef = useRef();
  const postToGet = useRef(1);

  const handleUpload = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Ensure that the post object is correctly structured
    formData.append("post[title]", "Test");
  
    if (imagesRef.current.files.length === 0) {
      alert("Please select at least one image.");
      return;
    }
  
    for (let i = 0; i < imagesRef.current.files.length; i++) {
      formData.append("post[images][]", imagesRef.current.files[i]);
    }
  
    postData(formData);
  };
  
const postData = (formData) => {
    fetch(`${API_URL}/posts`, {
        method: "POST",
        body: formData,
    })
    .then((res)=> res.json())
    .then((data) => {
        console.log(data);
        getImages();
    })
    .catch((err)=> console.log(err));
};

const getImages = () => {
    fetch(`${API_URL}/posts/${postToGet.current.value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setImages(data.images);
    })
    .catch((err) => console.log(err));
    };

  return(
    // upload form
    <div className = "upload-form">
        {/* upload images */}
        <form encType="multipart/form-data">
          <input type = "file"  name = "image" multiple ref = {imagesRef} />
        <button  type="button" onClick = {handleUpload} >
        Submit
      </button>
      </form>

        {/* display images */}
        <div>
            <input type="number" ref = {postToGet} placeholder = "ID to retrieve"/>
            <button onClick={getImages}>Get Images</button>
        </div>
        {/* images */}
        <div className="images">
            {images.map((image, index) => (
                <img key={index} 
                src={image}
                 alt="uploaded" 
                 style = {{width: "100px", height: "100px"}}/>
            ))}
            </div>
            </div>
  );
}

export default Posts;