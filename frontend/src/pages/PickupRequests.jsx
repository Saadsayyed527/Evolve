import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';

const PickupRequests = () => {
  const { user } = useContext(AuthContext);
  const [pickups, setPickups] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch pickup requests
  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const response = await axiosInstance.get('/api/pickup');
        console.log('Pickup data from backend:', response.data); // Debugging
        setPickups(response.data);
      } catch (error) {
        console.error('Error fetching pickup requests:', error);
        setError('Failed to fetch pickup requests');
      }
    };

    if (user) {
      fetchPickups();
    }
  }, [user]);

  const handleApprovePickup = async (pickupId) => {
    try {
      const response = await axiosInstance.put(`/api/pickup/approve/${pickupId}`);
      alert('Pickup approved successfully!');
      console.log('Pickup approval response:', response.data);
      setPickups(pickups.map((pickup) =>
        pickup._id === pickupId ? { ...pickup, status: 'Approved' } : pickup
      ));
    } catch (error) {
      console.error('Error approving pickup:', error);
      setError('Failed to approve pickup');
    }
  };

  const handleCompletePickup = async (pickupId) => {
    try {
      const response = await axiosInstance.put(`/api/pickup/complete/${pickupId}`);
      alert('Pickup marked as completed!');
      console.log('Pickup completion response:', response.data);
      setPickups(pickups.filter((pickup) => pickup._id !== pickupId));
    } catch (error) {
      console.error('Error completing pickup:', error);
      setError('Failed to complete pickup');
    }
  };

  // If user is not logged in, return null to avoid rendering
  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pickup Requests</h1>
      {error && <p style={styles.error}>{error}</p>}
      {pickups.length === 0 ? (
        <p style={styles.noRequests}>No pickup requests found.</p>
      ) : (
        <ul style={styles.list}>
          {pickups.map((pickup) => (
            <li key={pickup._id} style={styles.listItem}>
              <p style={styles.foodName}>Food: {pickup.foodId?.name}</p>
              <p style={styles.foodDetails}>Quantity: {pickup.foodId?.quantity}</p>
              <p style={styles.foodDetails}>Location: {pickup.foodId?.location}</p>
              <p style={pickup.status === 'Pending' ? styles.statusPending : styles.statusApproved}>
                Status: {pickup.status}
              </p>
              {user.role === 'Restaurant' && pickup.status === 'Pending' && (
                <button
                  style={styles.button}
                  onClick={() => handleApprovePickup(pickup._id)}
                >
                  Approve Pickup
                </button>
              )}
              {user.role === 'NGO' && pickup.status === 'Approved' && (
                <button
                  style={styles.button}
                  onClick={() => handleCompletePickup(pickup._id)}
                >
                  Mark as Completed
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
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
  noRequests: {
    textAlign: 'center',
    color: '#666',
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
  statusPending: {
    fontSize: '1rem',
    color: '#ffa500', // Orange for pending status
    fontWeight: '500',
  },
  statusApproved: {
    fontSize: '1rem',
    color: '#28a745', // Green for approved status
    fontWeight: '500',
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

export default PickupRequests;