const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// ✅ POST /api/unlock-queue
router.post('/', async (req, res) => {
  const { email, productId } = req.body;

  // ✅ تحقق من توفر البيانات
  if (!email || !productId) {
    return res.status(400).json({ message: "Missing email or productId" });
  }

  try {
    // ✅ إيجاد المستخدم
    const user = await User.findOne({ username: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ تحقق ما إذا انضم مسبقًا لنفس المنتج
    const alreadyInQueue = user.joinedUnlockQueue?.some(
      q => q.productId === productId
    );

    if (alreadyInQueue) {
      const queueLength = await User.countDocuments({
        'joinedUnlockQueue.productId': productId
      });
    
      return res.status(409).json({
        message: "❗ You have already joined the queue for this product",
        queueLength
      });
    }
    

    // ✅ أضف المنتج للـ queue للمستخدم الحالي
    user.joinedUnlockQueue.push({ productId });
    await user.save();

    // 🔢 احسب كم مستخدم انضم لنفس المنتج
    const queueLength = await User.countDocuments({
      'joinedUnlockQueue.productId': productId
    });

    return res.status(200).json({
      message: "✅ Added to unlock queue",
      queueLength
    });

  } catch (err) {
    console.error("❌ Error saving to MongoDB:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;



