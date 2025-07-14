const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  productName: String,
  requiredCount: Number,
  discountPercentage: Number,
  joinedUsers: [String]
});

module.exports = mongoose.models.Deal || mongoose.model('Deal', dealSchema);
