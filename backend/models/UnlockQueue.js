const mongoose = require('mongoose');

const unlockQueueSchema = new mongoose.Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UnlockQueue', unlockQueueSchema);
