const User = require('../models/User');
const Location = require('../models/Location');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const getUserLocations = async (req, res) => {
  const { userId } = req.params;
  const locations = await Location.find({ userId });
  res.json(locations);
};

module.exports = { getUsers, getUserLocations };
