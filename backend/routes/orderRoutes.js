// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();

router.post('/api/orders', (req, res) => {
  console.log('✅ New Order Received:', req.body);
  
  // Here you’d usually save to DB
  res.status(200).json({
    message: "Order saved successfully!",
    order: req.body
  });
});

module.exports = router;
