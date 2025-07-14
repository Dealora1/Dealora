<<<<<<< HEAD
// backend/routes/deals.js

=======
>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
const express = require('express');
const router = express.Router();
const Deal = require('../models/dealModel');

<<<<<<< HEAD
// ✅ Create a new deal
router.post('/', async (req, res) => {
  const {
    productId,
    productName,
    requiredCount,
    discountPercentage
  } = req.body;

  if (!productId || !productName) {
    return res.status(400).json({
      message: "Missing required fields: productId, productName"
    });
=======
router.post('/', async (req, res) => {
  const { productId, productName, requiredCount } = req.body;

  if (!productId || !requiredCount) {
    return res.status(400).json({ message: "Missing productId or requiredCount" });
>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
  }

  try {
    const existing = await Deal.findOne({ productId });
    if (existing) {
<<<<<<< HEAD
      return res.status(409).json({
        message: "Deal already exists for this product"
      });
    }

    const dealData = {
      productId,
      productName,
    };

    if (requiredCount !== undefined && discountPercentage !== undefined) {
      dealData.requiredCount = requiredCount;
      dealData.discountPercentage = discountPercentage;
    }

    const deal = new Deal(dealData);
    await deal.save();

    res.status(201).json({
      message: "Deal created successfully",
      deal
    });
  } catch (err) {
    console.error("❌ Error creating deal:", err);
    res.status(500).json({
      message: "Server error while creating deal"
    });
  }
});

// ✅ Get all deals
router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.status(200).json(deals);
  } catch (err) {
    console.error("❌ Error fetching deals:", err);
    res.status(500).json({
      message: "Server error while fetching deals"
    });
  }
});

// ✅ Get deal by productId
router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const deal = await Deal.findOne({ productId: productId.toString() });

    if (!deal) {
      return res.status(404).json({
        message: "No deal found.",
        discountPercentage: 0
      });
    }

    return res.json({
      discountPercentage: deal.discountPercentage ?? 0
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
=======
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
>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
