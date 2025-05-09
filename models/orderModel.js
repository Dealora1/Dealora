const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    city: String,
    paymentMethod: String,
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number // تأكد من أن السعر يتم تخزينه كـ Number
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
module.exports = mongoose.model('Order', orderSchema);
