const Order = require('../models/orderModel');

exports.placeOrder = async (req, res) => {
  try {
    const { name, email, address, city, paymentMethod, items } = req.body;

    if (!name || !email || !address || !city || !paymentMethod || !items) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // إرسال بيانات الطلب مع items
    const order = new Order({
      name,
      email,
      address,
      city,
      paymentMethod,
      items // تأكد من أن الـ items هنا تحتوي على المنتجات مع السعر والـ quantity
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Server error" });
  }
};
