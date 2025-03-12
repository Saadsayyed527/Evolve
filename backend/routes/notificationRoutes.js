const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch notifications for the logged-in user
router.get('/', authMiddleware, getNotifications);

module.exports = router;