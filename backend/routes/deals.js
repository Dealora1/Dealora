const express = require('express');
const router = express.Router();
const Deal = require('../models/dealModel');

router.post('/', async (req, res) => {
  const { productId, productName, requiredCount } = req.body;

  if (!productId || !requiredCount) {
    return res.status(400).json({ message: "Missing productId or requiredCount" });
  }

  try {
    const existing = await Deal.findOne({ productId });
    if (existing) {
      return res.status(409).json({ message: "Deal already exists for this product" });
    }

    const deal = new Deal({ productId, productName, requiredCount });
    await deal.save();

    res.status(201).json({ message: "Deal created successfully" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;