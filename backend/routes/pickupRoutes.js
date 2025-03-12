const express = require('express');
const {
  getRestaurantPickups,
  getNGOPickups,
  getPickups,
  requestPickup,
  approvePickup,
  completePickup,
} = require('../controllers/pickupController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch all pickup requests for a restaurant
router.get('/restaurant', authMiddleware, getRestaurantPickups);

// Fetch all approved pickups for an NGO
router.get('/ngo', authMiddleware, getNGOPickups);

// Fetch all pickup requests (for admin or debugging purposes)
router.get('/', authMiddleware, getPickups);

// Request a pickup (NGO)
router.post('/', authMiddleware, requestPickup);

// Approve a pickup request (Restaurant)
router.put('/approve/:pickupId', authMiddleware, approvePickup);

// Mark a pickup as completed (Restaurant)
router.put('/complete/:pickupId', authMiddleware, completePickup);

module.exports = router;