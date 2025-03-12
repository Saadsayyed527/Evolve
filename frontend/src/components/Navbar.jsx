import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About Us</Link>
      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/contact" style={styles.link}>Contact Us</Link>
      <Link to="/blockchain" style={styles.link}>Blockchain</Link> {/* New Blockchain Tab */}

      {user?.role === 'Restaurant' && (
        <Link to="/donate" style={styles.link}>Donate Food</Link>
      )}
      {user?.role === 'NGO' && (
        <Link to="/food-listings" style={styles.link}>View Food Listings</Link>
      )}
      <Link to="/notifications" style={styles.link}>Notifications</Link>
      {user?.role === 'NGO' && (
        <Link to="/pickup-requests" style={styles.link}>Pickup Requests</Link>
      )}

      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  button: {
    padding: '8px 16px',
    fontSize: '1rem',
    color: '#007bff',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
};

export default Navbar;
