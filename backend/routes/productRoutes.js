const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const Deal = require('../models/dealModel');

// ✅ Create new product
router.post('/', async (req, res) => {
  try {
    const { productId, name, price, image, requiredCount, discountPercentage } = req.body;

    if (!productId || !name || !price || !image) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Ensure proper types
    const parsedPrice = parseFloat(price);
    const parsedRequiredCount = requiredCount ? parseInt(requiredCount) : null;
    const parsedDiscountPercentage = discountPercentage ? parseFloat(discountPercentage) : null;

    // Check for invalid numbers
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'Invalid price.' });
    }
    if (parsedRequiredCount !== null && isNaN(parsedRequiredCount)) {
      return res.status(400).json({ message: 'Invalid requiredCount.' });
    }
    if (parsedDiscountPercentage !== null && isNaN(parsedDiscountPercentage)) {
      return res.status(400).json({ message: 'Invalid discountPercentage.' });
    }

    const existing = await Product.findOne({ productId });
    if (existing) {
      return res.status(400).json({ message: 'Product ID already exists.' });
    }

    const product = new Product({
      productId,
      name,
      price: parsedPrice,
      image
    });

    await product.save();

    // Save deal only if fields provided
    if (parsedRequiredCount && parsedDiscountPercentage) {
      try {
        const deal = new Deal({
          productId,
          productName: name,
          requiredCount: parsedRequiredCount,
          discountPercentage: parsedDiscountPercentage,
          joinedUsers: []
        });
        await deal.save();
      } catch (dealError) {
        console.error('Deal save error:', dealError);
        return res.status(500).json({ message: 'Failed to save deal.' });
      }
    }

    res.status(201).json({ message: 'Product created successfully.' });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ✅ Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
