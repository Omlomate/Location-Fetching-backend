// models/LoginLog.js
const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isSuccess: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now },
    location: { type: String, default: 'Unknown' }, // Store location here
  },
  { timestamps: true }
);

const LoginLog = mongoose.model('LoginLog', loginLogSchema);

module.exports = LoginLog;
