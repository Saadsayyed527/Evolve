import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';

const DonateFood = () => {
  const { user } = useContext(AuthContext); // Destructure user from context
  const [formData, setFormData] = useState({ name: '', quantity: '', location: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null; // Return null to avoid rendering anything
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send donation data to the backend
      const response = await axiosInstance.post('/api/food', {
        ...formData,
        donatedBy: user.id, // Include the user ID in the donation data
      });

      if (response.status === 201) {
        // Redirect to the dashboard after successful donation
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Donation error:', error);
      setError(error.response?.data?.message || 'Donation failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Donate Food</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Food Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Pickup Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Donate
        </button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  error: {
    color: '#ff4d4f',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default DonateFood;