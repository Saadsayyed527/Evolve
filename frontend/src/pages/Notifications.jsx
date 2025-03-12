import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/api/notifications');
        console.log('Notifications data:', response.data); // Debugging
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  // Handle completing a pickup
  const handleCompletePickup = async () => {
    try {
      // const response = await axiosInstance.put(`/api/pickup/complete/${pickupId}`);
      // console.log('Pickup completion response:', response.data);
      navigate('/');
      // Show alert message
      alert('Process Completed');

      // Navigate to the home page

      // Update the notifications list to reflect the completed status
      // setNotifications((prevNotifications) =>
      //   prevNotifications.map((notification) =>
      //     notification.pickupId?._id === pickupId
      //       ? { ...notification, pickupId: { ...notification.pickupId, status: 'Completed' } }
      //       : notification
      //   )
      // );
    } catch (error) {
      console.error('Error completing pickup:', error);
      setError('Failed to complete pickup');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notifications</h1>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {notifications.map((notification) => (
          <li key={notification._id} style={styles.listItem}>
            <p style={styles.message}>{notification.message}</p>
            {/* {user.role === 'Restaurant' && notification.pickupId?.status === 'Approved' && (
              
            )} */}
            <button
                style={styles.button}
                onClick={() => handleCompletePickup()}
              >
                Complete Pickup
              </button>
            {user.role === 'NGO' && notification.pickupId?.status === 'Completed' && (
              <p style={styles.completed}>Completed</p>
            )}
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
  message: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '10px',
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
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  completed: {
    color: '#28a745',
    fontWeight: '500',
  },
};

export default Notifications;