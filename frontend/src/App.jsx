import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DonateFood from './pages/DonateFood';
import FoodListings from './pages/FoodListings';
import Notifications from './pages/Notifications';
import PickupRequests from './pages/PickupRequests';
import Home from './pages/Home';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs'; // Import the AboutUs component
import ContactUs from './pages/ContactUs'; // Import the ContactUs component
import Blockchain from './pages/Blockchain'; // Import Blockchain Page

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Navbar />
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} /> {/* Add About Us route */}
            <Route path="/contact" element={<ContactUs />} /> {/* Add Contact Us route */}

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blockchain" element={<Blockchain />} /> {/* Blockchain Route */}

            <Route path="/donate" element={<DonateFood />} />
            <Route path="/food-listings" element={<FoodListings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/pickup-requests" element={<PickupRequests />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Flexbox styles
const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure the container takes at least the full viewport height
  },
  mainContent: {
    flex: 1, // Allow the main content to grow and push the footer to the bottom
  },
};

export default App;