import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Destructure user from context
  const navigate = useNavigate();

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null; // Return null to avoid rendering anything
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {user.name}</h1>
      <div style={styles.buttonContainer}>
        {user.role === 'Restaurant' && (
          <button style={styles.button} onClick={() => navigate('/donate')}>
            Donate Food
          </button>
        )}
        {user.role === 'NGO' && (
          <button style={styles.button} onClick={() => navigate('/food-listings')}>
            View Available Food
          </button>
        )}
        {user.role === 'Individual' && (
          <button style={styles.button} onClick={() => navigate('/food-listings')}>
            View Food Listings
          </button>
        )}
      </div>
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
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '40px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    padding: '15px 30px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Dashboard;