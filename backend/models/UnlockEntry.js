const mongoose = require('mongoose');

const unlockEntrySchema = new mongoose.Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

// The third argument forces the collection name to "queue"
module.exports = mongoose.model('UnlockEntry', unlockEntrySchema, 'queue');
