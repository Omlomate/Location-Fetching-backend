const express = require('express');
const Location = require('../models/Location');
const router = express.Router();

// Route to receive user's location
router.post('/location', async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  // Validate the request body
  if (!userId || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing userId, latitude, or longitude' });
  }

  try {
    // Update the location for the user
    const updatedLocation = await Location.findOneAndUpdate(
      { userId }, // Find the document with the given userId
      { latitude, longitude, timestamp: Date.now() }, // Update the latitude, longitude, and timestamp
      { new: true, upsert: true } // `new: true` returns the updated document, `upsert: true` creates a new document if not found
    );

    res.status(200).json({ message: 'Location updated successfully', location: updatedLocation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating location' });
  }
});

module.exports = router;
