import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setToken, setUser } = useContext(AuthContext); // Ensure AuthProvider is wrapping the app
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/auth/login', formData);

      // Save token and user data
      setToken(response.data.token);
      setUser(response.data);
      localStorage.setItem('token', response.data.token);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // Backend returned an error response (4xx or 5xx)
        setError(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.registerText}>
          Don't have an account?{' '}
          <a href="/register" style={styles.registerLink}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    color: '#ff4d4f',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
  registerText: {
    marginTop: '20px',
    color: '#666',
  },
  registerLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Login;