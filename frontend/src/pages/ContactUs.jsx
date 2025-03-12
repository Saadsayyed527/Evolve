import React, { useState } from 'react';
import axiosInstance from '../api/axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/contact', formData);
      if (response.status === 201) {
        setSuccess('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Side: Image */}
      <div style={styles.imageContainer}>
        <img
          src={`/contact.jpg`} // Image from the public folder
          alt="Contact Us"
          style={styles.image}
        />
      </div>

      {/* Right Side: Contact Form */}
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Contact Us</h1>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px', // Space between image and form
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '100vh', // Full viewport height
  },
  imageContainer: {
    flex: 1,
    maxWidth: '50%',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  formContainer: {
    flex: 1,
    maxWidth: '50%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
  textarea: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
    minHeight: '150px',
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
  error: {
    color: '#ff4d4f',
    marginBottom: '20px',
  },
  success: {
    color: '#28a745',
    marginBottom: '20px',
  },
};

export default ContactUs;