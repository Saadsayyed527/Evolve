// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Create a Contact model

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save the contact form data to the database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'Failed to submit the contact form.' });
  }
});

module.exports = router;