import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axiosInstance.get('/api/food');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching food listings:', error);
        setError('Failed to fetch food listings');
      }
    };

    fetchFoods();
  }, []);

  const handleRequestPickup = async () => {
    try {
      navigate("/home")
      alert('Pickup requested successfully!');
      
    } catch (error) {
      console.error('Error requesting pickup:', error);
      setError('Failed to request pickup');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Food Listings</h1>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {foods.map((food) => (
          <li key={food._id} style={styles.listItem}>
            <p style={styles.foodName}>{food.name}</p>
            <p style={styles.foodDetails}>Quantity: {food.quantity} units</p>
            <p style={styles.foodDetails}>Location: {food.location}</p>
            
              <button
                style={styles.button}
                onClick={() => handleRequestPickup()}
              >
                completed request 
              </button>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  error: {
    color: '#ff4d4f',
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
  },
  foodName: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '10px',
  },
  foodDetails: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '5px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Notifications;