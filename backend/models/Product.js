const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
