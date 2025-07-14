<<<<<<< HEAD
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
=======
// const mongoose = require('mongoose');

// const dealSchema = new mongoose.Schema({
//   productId: { type: String, required: true, unique: true },
//   requiredCount: { type: Number, required: true },
//   joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// });

// module.exports = mongoose.model('Deal', dealSchema);


// const mongoose = require('mongoose');

// const dealSchema = new mongoose.Schema({
//   productId: { type: String, required: true, unique: true },
//   productName: String,
//   requiredCount: { type: Number, required: true },
//   joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// });

// module.exports = mongoose.model('Deal', dealSchema);


// models/dealModel.js
// ✅ dealModel.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  requiredCount: { type: Number, required: true },
  discountPercentage: { type: Number, required: true }, // ✅ نسبة الخصم التي يحددها البائع
  joinedUsers: { type: [String], default: [] } // Array of emails
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);


>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
