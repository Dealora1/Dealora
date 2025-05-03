const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seller', 'buyer'], required: true },

  // ✅ أضف هذا الجزء:
  joinedUnlockQueue: [
    {
      productId: { type: String, required: true },
      joinedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);

