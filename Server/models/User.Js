const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String }, // Optional now
  password: { type: String }, // Optional with OTP
  occupation: { type: String, required: true, default: '' }, // KEY FIELD
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);