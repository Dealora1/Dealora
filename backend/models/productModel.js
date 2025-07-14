// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   quantity: Number,
//   discount: Number,
//   description: String,
//   imagePath: String
// });

// module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: Number,
  image: String
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
