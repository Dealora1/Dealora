const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  requiredCount: { type: Number, required: true },
  joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Deal', dealSchema);
