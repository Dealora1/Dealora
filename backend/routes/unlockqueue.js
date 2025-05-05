// routes/unlockqueue.js
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
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deal = await Deal.findOne({ productId });
    if (!deal) {
      return res.status(404).json({ message: "Deal not found for this product" });
    }

    // ✅ تحقق إذا كان المستخدم انضم مسبقاً بناءً على joinedUsers
    const alreadyJoined = deal.joinedUsers.includes(user._id);
    if (alreadyJoined) {
      const queueLength = deal.joinedUsers.length;
      return res.status(409).json({
        message: "❗ You have already joined the queue for this product",
        queueLength
      });
    }

    // ✅ أضف معرف المستخدم إلى joinedUsers داخل الصفقة
    deal.joinedUsers.push(user._id);
    await deal.save();

    const queueLength = deal.joinedUsers.length;
    const isActivated = queueLength >= deal.requiredCount;

    return res.status(200).json({
      message: isActivated
        ? `🎉 Discount Activated! ${queueLength} users have joined.`
        : `✅ Joined the queue! There are now ${queueLength} people.`,
      queueLength,
      discountActivated: isActivated
    });

  } catch (err) {
    console.error("❌ Error in unlock queue:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;








