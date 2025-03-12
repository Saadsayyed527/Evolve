const Pickup = require('../models/Pickup');
const Notification = require('../models/Notification');
const Food = require('../models/Food');

// Fetch all pickup requests for a restaurant
const getRestaurantPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ foodId: { $in: req.user.donatedFoods } })
      .populate('foodId', 'name quantity location')
      .populate('ngoId', 'name email');
    res.status(200).json(pickups);
  } catch (error) {
    console.error('Error fetching restaurant pickup requests:', error);
    res.status(500).json({ message: 'Server error while fetching pickup requests' });
  }
};

// Fetch all approved pickups for an NGO
const getNGOPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ ngoId: req.user.id, status: 'Approved' })
      .populate('foodId', 'name quantity location donatedBy')
      .populate('ngoId', 'name email');
    res.status(200).json(pickups);
  } catch (error) {
    console.error('Error fetching NGO pickup requests:', error);
    res.status(500).json({ message: 'Server error while fetching pickup requests' });
  }
};

// Fetch all pickup requests (for admin or debugging purposes)
const getPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate('foodId', 'name quantity location donatedBy')
      .populate('ngoId', 'name email');
    res.status(200).json(pickups);
  } catch (error) {
    console.error('Error fetching pickup requests:', error);
    res.status(500).json({ message: 'Server error while fetching pickup requests' });
  }
};

// Request Pickup (NGO)
const requestPickup = async (req, res) => {
  const { foodId } = req.body;

  try {
    // Check if the food item exists
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Create a new pickup request
    const pickup = await Pickup.create({ foodId, ngoId: req.user.id });

    // Notify the restaurant
    await Notification.create({
      message: `New pickup request for ${food.name}`,
      userId: food.donatedBy,
      pickupId: pickup._id,
    });

    res.status(201).json(pickup);
  } catch (error) {
    console.error('Error creating pickup request:', error);
    res.status(500).json({ message: error.message });
  }
};

// Approve Pickup (Restaurant)
const approvePickup = async (req, res) => {
  const { pickupId } = req.params;

  try {
    // Check if the pickup request exists
    const pickup = await Pickup.findById(pickupId);
    if (!pickup) {
      return res.status(404).json({ message: 'Pickup request not found' });
    }

    // Update the pickup status to "Approved"
    const updatedPickup = await Pickup.findByIdAndUpdate(
      pickupId,
      { status: 'Approved' },
      { new: true }
    );

    // Notify the NGO
    await Notification.create({
      message: 'Your pickup request has been approved',
      userId: pickup.ngoId,
    });

    res.status(200).json(updatedPickup);
  } catch (error) {
    console.error('Error approving pickup request:', error);
    res.status(500).json({ message: error.message });
  }
};

// Complete Pickup (NGO)
const completePickup = async (req, res) => {
  const { pickupId } = req.params;

  try {
    // Check if the pickup request exists
    const pickup = await Pickup.findById(pickupId);
    if (!pickup) {
      return res.status(404).json({ message: 'Pickup request not found' });
    }

    // Update the pickup status to "Completed"
    const updatedPickup = await Pickup.findByIdAndUpdate(
      pickupId,
      { status: 'Completed' },
      { new: true }
    );

    // Notify the NGO
    await Notification.create({
      message: 'Your pickup request has been completed',
      userId: pickup.ngoId,
      pickupId: pickup._id,
    });

    res.status(200).json(updatedPickup);
  } catch (error) {
    console.error('Error completing pickup request:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRestaurantPickups,
  getNGOPickups,
  getPickups,
  requestPickup,
  approvePickup,
  completePickup,
};