const Location = require('../models/Location');

const saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const location = new Location({ userId: req.user.id, latitude, longitude });
    await location.save();
    res.status(201).json({ message: 'Location saved' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { saveLocation };
