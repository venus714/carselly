import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Packages.css"; // Ensure this file exists and is correctly placed

const API_URL = "http://127.0.0.1:3000";

function Packages() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageSelect = async (packageName) => {
    setSelectedPackage(packageName);

    const savedPostData = JSON.parse(localStorage.getItem("pendingPostData"));
    const imagesCount = localStorage.getItem("pendingPostImagesCount");

    if (!savedPostData || !imagesCount) {
      alert("No post data found.");
      return;
    }

    const formData = new FormData();

    Object.keys(savedPostData).forEach((key) => {
      formData.append(`post[${key}]`, savedPostData[key]);
    });

    // Append the selected package
    formData.append(`post[package]`, packageName);

    for (let i = 0; i < imagesCount; i++) {
      const base64Image = localStorage.getItem(`pendingImage${i}`);
      if (base64Image) {
        // Convert base64 back to Blob
        const blob = base64toBlob(base64Image);
        formData.append("post[images][]", blob, `image${i}.jpg`);
      }
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      alert("Post uploaded successfully with selected package!");
      localStorage.clear(); // Clear temporary storage
      navigate("/"); // Go back home or to a success page
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload post. Please try again.");
    }
  };

  const base64toBlob = (base64) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="b-packages-section">
      <div className="b-packages-section__inner">
        <h2>Select a Package</h2>
        <button className="package-button" onClick={() => handlePackageSelect("Trial for free 7 days")}>Trial for free 7 days</button>
        <button className="package-button" onClick={() => handlePackageSelect("TOP 7 days")}>TOP 7 days</button>
        <button className="package-button" onClick={() => handlePackageSelect("30 days KSh 900")}>30 days KSh 900</button>
        <button className="package-button" onClick={() => handlePackageSelect("Boost Premium promo 1 month KSh 8,699")}>Boost Premium promo 1 month KSh 8,699</button>
      </div>
    </div>
  );
}

export default Packages;
