const express = require('express');
const { donateFood, getFoodListings } = require('../controllers/foodController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, donateFood);
router.get('/', authMiddleware, getFoodListings);

module.exports = router;