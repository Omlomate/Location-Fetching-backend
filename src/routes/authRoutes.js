// src/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requestIp = require('request-ip'); // You can use this to get the user's IP address
const LoginLog = require('../models/LoginLog'); // Make sure this is correctly imported
const geoip = require('geoip-lite');


const router = express.Router();

// Register Route (Already done)
router.post('/register', async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, isAdmin });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const clientIp = requestIp.getClientIp(req); // Get the IP address from the request

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate token with user data (including isAdmin)
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Capture location (you can also use a geolocation service here)
    const location = clientIp; // You can enhance this with actual location data using a geolocation API

    // Log successful login with location
    await LoginLog.create({
      userId: user._id,
      isSuccess: true,
      location, // Store the location
    });

    // Send token and isAdmin info
    res.status(200).json({ token, userId: user._id, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});


module.exports = router;
