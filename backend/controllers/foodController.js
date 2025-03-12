const Food = require('../models/Food');

// Donate Food
const donateFood = async (req, res) => {
  const { name, quantity, location } = req.body;
  try {
    const food = await Food.create({ name, quantity, location, donatedBy: req.user.id });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Food Listings
const getFoodListings = async (req, res) => {
  try {
    const foods = await Food.find().populate('donatedBy', 'name');
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { donateFood, getFoodListings };