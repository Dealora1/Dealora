const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Deal = require('../models/dealModel');

router.post('/', async (req, res) => {
  const { email, productId } = req.body;

  if (!email || !productId) {
    return res.status(400).json({ message: "Missing email or productId" });
  }

  try {
    const user = await User.findOne({ username: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const deal = await Deal.findOne({ productId });
    if (!deal) return res.status(404).json({ message: "Deal not found" });

    const alreadyJoined = deal.joinedUsers.includes(user._id);
    if (alreadyJoined) {
      return res.status(409).json({
        message: "You have already joined",
        queueLength: deal.joinedUsers.length
      });
    }

    deal.joinedUsers.push(user._id);
    await deal.save();

    const isActivated = deal.joinedUsers.length >= deal.requiredCount;

    return res.status(200).json({
      message: isActivated
        ? `🎉 Discount Activated! ${deal.joinedUsers.length} users have joined.`
        : `✅ Joined! Total: ${deal.joinedUsers.length}`,
      queueLength: deal.joinedUsers.length,
      discountActivated: isActivated
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
