import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const Blockchain = () => {
  const [file, setFile] = useState(null);
  const [foodData, setFoodData] = useState({
    foodName: "",
    quantity: "",
    peopleFed: "",
    expiryDate: "",
    pickupLocation: "",
    notes: "",
  });

  const [ipfsHash, setIpfsHash] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);

  // Pinata API Keys (Replace with your own)
  const PINATA_API_KEY = "c00abb7b72e1f1910f41";
  const PINATA_SECRET_KEY = "c27740546c56ece51f8d085b644beb018a26d90cf1145c44c8f9ef388ae4b427";

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setIpfsHash("");
    setError("");
  };

  // Handle food donation form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Upload file and metadata to Pinata IPFS
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    if (!foodData.foodName || !foodData.quantity || !foodData.peopleFed || !foodData.expiryDate || !foodData.pickupLocation) {
      setError("Please fill in all required fields.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
      foodDetails: foodData, // Include food donation details
      timestamp: new Date().toLocaleString(),
    });

    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });

      setIpfsHash(res.data.IpfsHash);
      setReportGenerated(true);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("File upload failed. Please try again.");
    }

    setUploading(false);
  };

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Food Donation Blockchain Report", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.text(`Food Name: ${foodData.foodName}`, 20, 40);
    doc.text(`Quantity: ${foodData.quantity} kg`, 20, 50);
    doc.text(`People Fed: ${foodData.peopleFed}`, 20, 60);
    doc.text(`Expiry Date: ${foodData.expiryDate}`, 20, 70);
    doc.text(`Pickup Location: ${foodData.pickupLocation}`, 20, 80);
    doc.text(`Notes: ${foodData.notes || "N/A"}`, 20, 90);
    doc.text(`Uploaded File: ${file?.name || "No file uploaded"}`, 20, 100);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 20, 110);

    if (ipfsHash) {
      doc.text(`IPFS Storage Link:`, 20, 130);
      doc.text(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, 20, 140);
    }

    doc.save(`Food_Donation_Report_${Date.now()}.pdf`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Donate Food & Upload to IPFS</h1>

      {/* Food Donation Form */}
      <input type="text" name="foodName" placeholder="Food Name" value={foodData.foodName} onChange={handleInputChange} style={styles.input} required />
      <input type="text" name="quantity" placeholder="Quantity (kg)" value={foodData.quantity} onChange={handleInputChange} style={styles.input} required />
      <input type="number" name="peopleFed" placeholder="Number of People Fed" value={foodData.peopleFed} onChange={handleInputChange} style={styles.input} required />
      <input type="date" name="expiryDate" placeholder="Expiry Date" value={foodData.expiryDate} onChange={handleInputChange} style={styles.input} required />
      <input type="text" name="pickupLocation" placeholder="Pickup Location" value={foodData.pickupLocation} onChange={handleInputChange} style={styles.input} required />
      <textarea name="notes" placeholder="Additional Notes (optional)" value={foodData.notes} onChange={handleInputChange} style={styles.textarea}></textarea>

      {/* File Upload */}
      <input type="file" onChange={handleFileChange} style={styles.input} />

      {/* Upload Button */}
      <button onClick={handleUpload} style={styles.button} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload to IPFS"}
      </button>

      {/* Success Message */}
      {ipfsHash && (
        <p style={styles.success}>
          ✅ Uploaded Successfully:{" "}
          <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            View on IPFS
          </a>
        </p>
      )}

      {/* Download Report Button */}
      {reportGenerated && (
        <button onClick={generatePDF} style={styles.downloadButton}>
          📄 Download Report
        </button>
      )}

      {/* Error Message */}
      {error && <p style={styles.error}>❌ {error}</p>}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  textarea: {
    width: "80%",
    height: "80px",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  downloadButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  success: { marginTop: "20px", color: "green" },
  error: { marginTop: "20px", color: "red" },
};

export default Blockchain;
