const express = require('express');
const router = express.Router();
const Deal = require('../models/dealModel');

router.post('/', async (req, res) => {
  try {
    const { productId, productName, requiredCount } = req.body;
    console.log('🚀 New Deal Request:', { productId, productName, requiredCount });

    if (!productId || !productName || !requiredCount) {
      console.log('❌ Missing fields');
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newDeal = new Deal({ productId, productName, requiredCount });
    await newDeal.save();
    console.log('✅ Deal saved');
    res.status(201).json({ message: 'Deal created' });
  } catch (error) {
    console.error('❌ Error creating deal:', error);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

module.exports = router;

