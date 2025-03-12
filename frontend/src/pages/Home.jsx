import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div style={styles.homeContainer}>
      {/* Overlay to dim the background image */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <h1 style={styles.heading}>Welcome to FoodBridge</h1>
      <p style={styles.subHeading}>Connecting surplus food to those in need.</p>

      <div style={styles.buttonContainer}>
        {/* Button to navigate to the Register page */}
        <button
          style={styles.button}
          onClick={() => navigate('/register')} // Navigate to /register
        >
          Register
        </button>

        {/* Button to navigate to the Login page */}
        <button
          style={styles.button}
          onClick={() => navigate('/login')} // Navigate to /login
        >
          Login
        </button>

        {/* File upload input */}
        
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  homeContainer: {
    textAlign: 'center',
    padding: '20px',
    height: '100vh', // Full viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(home.webp)', // Use image from public folder
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    position: 'relative', // Needed for the overlay
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background (adjust opacity as needed)
    zIndex: 1, // Ensure overlay is above the background image
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: '#fff', // White text for better contrast
    zIndex: 2, // Ensure text is above the overlay
  },
  subHeading: {
    fontSize: '1.2rem',
    color: '#ddd', // Light gray text for better contrast
    marginBottom: '30px',
    zIndex: 2, // Ensure text is above the overlay
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px', // Space between buttons
    zIndex: 2, // Ensure buttons are above the overlay
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff', // Blue color for buttons
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    fontSize: '1rem',
  },
  uploadInput: {
    display: 'none', // Hide the default file input
  },
};

export default Home;