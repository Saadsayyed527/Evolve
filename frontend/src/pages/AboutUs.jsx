import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <div style={styles.content}>
        <p style={styles.text}>
          Welcome to <strong>FoodBridge</strong>, a platform dedicated to connecting surplus food with those in need. Our mission is to reduce food waste and fight hunger by bridging the gap between restaurants, NGOs, and individuals.
        </p>
        <p style={styles.text}>
          Whether you're a <strong>Restaurant</strong> with excess food, an <strong>NGO</strong> looking to distribute food to the needy, or an <strong>Individual</strong> wanting to contribute, FoodBridge provides a seamless way to make a difference.
        </p>
        <p style={styles.text}>
          Join us in our journey to create a world where no food goes to waste, and no one goes hungry.
        </p>

        {/* Hunger Problem Section */}
        <div style={styles.section}>
          <div style={styles.imageContainer}>
            <img
              src={`/pic_2.jpg`} // Image for hunger problem
              alt="Hunger Problem"
              style={styles.image}
            />
          </div>
          <div style={styles.textContainer}>
            <h2 style={styles.sectionTitle}>The Hunger Problem</h2>
            <p style={styles.sectionText}>
              Hunger remains one of the most pressing global issues, with millions of people around the world struggling to access nutritious meals every day. Despite an abundance of food production, unequal distribution and food waste exacerbate the problem. At FoodBridge, we aim to address this by connecting surplus food from restaurants and individuals to those who need it most.
            </p>
          </div>
        </div>

        {/* Food Waste Problem Section */}
        <div style={styles.section}>
          <div style={styles.textContainer}>
            <h2 style={styles.sectionTitle}>The Food Waste Problem</h2>
            <p style={styles.sectionText}>
              Food waste is a significant contributor to global hunger and environmental degradation. Every year, billions of tons of food are wasted, while millions go hungry. By redirecting surplus food to those in need, we not only reduce waste but also help combat hunger. FoodBridge provides a platform for restaurants, NGOs, and individuals to collaborate and make a meaningful impact.
            </p>
          </div>
          <div style={styles.imageContainer}>
            <img
              src={`/food_waste.jpg`} // Image for food waste problem
              alt="Food Waste Problem"
              style={styles.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    margin: '40px 0',
  },
  imageContainer: {
    flex: 1,
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  textContainer: {
    flex: 1,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
  },
  sectionText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  },
};

export default AboutUs;