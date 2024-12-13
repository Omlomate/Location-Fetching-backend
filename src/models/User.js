// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Enforce only 'user' or 'admin' as valid roles
    default: 'user' // Default role is 'user'
  },
  isAdmin: { type: Boolean, default: false }, // This can be kept for additional checks
});

// Optional: Pre-save hook to ensure 'role' matches 'isAdmin' status
userSchema.pre('save', function(next) {
  if (this.isAdmin) {
    this.role = 'admin';
  } else {
    this.role = 'user';
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

