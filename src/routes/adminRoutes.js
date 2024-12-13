// src/routes/adminRoutes.js
const express = require('express');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog'); // Import LoginLog model
const Location = require('../models/Location');  // Correct path to the Location model



const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin: Get All Registered Users (Protected Route)
router.get('/users', authMiddleware, adminMiddleware, (req, res) => {
  User.find({ isAdmin: false }) // Get all non-admin users
    .then(users => {
      res.status(200).json(users); // Return list of users
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

// Example route returning location logs
router.get('/location-logs/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const loginLogs = await LoginLog.find({ userId }).sort({ timestamp: -1 });

    if (!loginLogs || loginLogs.length === 0) {
      return res.status(200).json({
        lastLogin: null,
        location: 'Unknown',
        logs: [],
      });
    }

    const latestLog = loginLogs[0]; // Latest log for the user

    res.status(200).json({
      lastLogin: latestLog.timestamp, // Ensure timestamp is in a valid format
      location: latestLog.location,   // Ensure location is available
      logs: loginLogs,                // Return all logs
    });
  } catch (err) {
    console.error('Error fetching login logs:', err);
    res.status(500).json({ error: 'Error fetching login logs' });
  }
});



// Fetch the latest location for a specific user
router.get('/location/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the latest location for the user
    const locationLogs = await Location.find({ userId }).sort({ timestamp: -1 }).limit(1);

    if (locationLogs.length === 0) {
      return res.status(404).json({ message: 'No location found for this user.' });
    }

    const latestLocation = locationLogs[0];

    res.status(200).json({
      latitude: latestLocation.latitude,
      longitude: latestLocation.longitude,
      timestamp: latestLocation.timestamp,
    });
  } catch (err) {
    console.error('Error fetching location:', err);
    res.status(500).json({ error: 'Error fetching location' });
  }
});

router.get('/login-logs/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all login logs for the given userId
    const loginLogs = await LoginLog.find({ userId }).sort({ timestamp: -1 }); // Sorting by timestamp, latest first

    if (!loginLogs || loginLogs.length === 0) {
      return res.status(404).json({ data: [] }); // Return empty data array instead of an error message
    }

    // Return the login logs in the response
    res.status(200).json({
      data: loginLogs, // Return logs as data
    }); 
  } catch (err) {
    console.error('Error fetching login logs:', err);
    res.status(500).json({ data: [], error: 'Error fetching login logs' }); // Return error within data structure
  }
});





module.exports = router;
