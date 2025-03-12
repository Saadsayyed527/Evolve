const Notification = require('../models/Notification');

// Get Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'pickupId',
        populate: [
          { path: 'foodId', select: 'name quantity location' },
          { path: 'ngoId', select: 'name email' }
        ]
      });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getNotifications };