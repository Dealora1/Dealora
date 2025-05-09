const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// ✅ GET test route
router.get('/test', (req, res) => {
  res.send('✅ Order route working');
});

// ✅ POST /api/orders
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (err) {
    console.error('❌ Error saving order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

module.exports = router;
