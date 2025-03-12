import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>FoodBridge &copy; 2025. All rights reserved.</p>
      <div style={styles.socialLinks}>
        <p style={styles.developer}>Developed by Saad Sayyed </p>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/github.png"
            alt="GitHub"
            style={styles.icon}
          />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
            alt="LinkedIn"
            style={styles.icon}
          />
        </a>
      </div>
    </footer>
  );
}

// Inline styles
const styles = {
  footer: {
    backgroundColor: '#fff', // White background
    color: '#000', // Black text
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto', // Push footer to the bottom of the page
    borderTop: '1px solid #e0e0e0', // Light gray border for separation
  },
  text: {
    margin: '0',
    fontSize: '1rem',
    color: '#000', // Black text
  },
  socialLinks: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  developer: {
    margin: '0',
    fontSize: '0.9rem',
    color: '#666', // Dark gray for developer text
  },
  link: {
    textDecoration: 'none',
    color: '#000', // Black for links
  },
  icon: {
    width: '24px',
    height: '24px',
    filter: 'invert(0)', // Keep icons black
  },
};

export default Footer;