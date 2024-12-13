// src/controllers/authController.js
const User = require('../models/User');

// Register a new user or admin
const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    // Create the user (check if user is admin and assign role)
    const newUser = new User({
      name,
      email,
      password,
      role: isAdmin ? 'admin' : 'user', // Set role to 'admin' if isAdmin is true
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser };
