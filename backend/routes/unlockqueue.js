// ✅ Importing Required Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deal = require('../models/dealModel');

// ✅ مسار الانضمام إلى قائمة الانتظار (Join to Unlock)
router.post('/', async (req, res) => {
  const { email, productId } = req.body;

  if (!email || !productId) {
    return res.status(400).json({ message: 'Email and Product ID are required' });
  }

  try {
    // ✅ البحث عن الصفقة (Deal) وإضافة المستخدم إلى قائمة الانتظار
    const deal = await Deal.findOne({ productId });
    if (!deal) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // ✅ التحقق إذا كان المستخدم موجود بالفعل في القائمة
    if (deal.joinedUsers.includes(email)) {
      return res.status(400).json({ message: 'You have already joined the queue.', alreadyJoined: true });
    }

    // ✅ إضافة المستخدم إلى القائمة
    deal.joinedUsers.push(email);
    await deal.save();

    // ✅ تحقق إذا كانت القائمة مكتملة لتفعيل الخصم
    const discountActivated = deal.joinedUsers.length >= deal.requiredCount;

    res.status(200).json({
      message: "Joined the queue",
      queueLength: deal.joinedUsers.length,
      discountActivated
    });
  } catch (error) {
    console.error("❌ Error joining queue:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ مسار عرض حجم القائمة (Queue Size)
router.get('/queue-size', async (req, res) => {
  const { productId } = req.query;

  try {
    const deal = await Deal.findOne({ productId });
    if (!deal) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ queueLength: deal.joinedUsers.length });
  } catch (error) {
    console.error("❌ Error loading queue size:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Exporting the Router
module.exports = router;























// // ✅ Universal Join to Unlock Script

// // ✅ Function to Load Product Details and Apply Discount
// function initializeJoinToUnlock() {
//   const params = new URLSearchParams(window.location.search);
//   const image = params.get("image");
//   const name = params.get("name");
//   const price = parseFloat(params.get("price")?.replace("sr", "").trim() || "0");

//   if (image && name && price) {
//     document.getElementById("product-image").src = "image/" + decodeURIComponent(image);
//     document.getElementById("product-name").textContent = decodeURIComponent(name);
//     document.getElementById("product-price").textContent = price + " SAR";
//   }

//   // ✅ Load the current queue size for this product
//   loadQueueSize();

//   // ✅ Join to Unlock logic (Automatic with logged-in email)
//   const joinButton = document.getElementById('joinUnlockBtn');
//   if (joinButton) {
//     joinButton.addEventListener('click', async () => {
//       const email = localStorage.getItem("userEmail");
//       const productId = document.getElementById("product-name").textContent.trim();

//       if (!email) {
//         alert("⚠️ Please sign in to join the discount queue.");
//         window.location.href = "signin.html";
//         return;
//       }

//       try {
//         const res = await fetch('http://localhost:3000/api/unlock-queue', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, productId })
//         });

//         const data = await res.json();

//         if (res.ok) {
//           if (data.discountActivated) {
//             alert("🎉 Discount Activated! " + data.queueLength + " users have joined.");

//             // ✅ Apply Discount (50% for example)
//             const discountedPrice = (price * 0.5).toFixed(2);
//             addToCart(image, name, discountedPrice);
//             window.location.href = "cart.html";
//           } else {
//             alert(`✅ Joined the queue! ${data.queueLength} users have joined.`);
//             document.getElementById("queueInfo").textContent = `🔥 Current queue size: ${data.queueLength}`;
//           }
//         } else {
//           alert("❌ " + data.message);
//         }
//       } catch (err) {
//         alert("❌ Server error");
//         console.error(err);
//       }
//     });
//   }
// }

// // ✅ Function to load the current queue size
// async function loadQueueSize() {
//   const productId = document.getElementById("product-name").textContent.trim();
//   try {
//     const res = await fetch(`http://localhost:3000/api/unlock-queue/queue-size?productId=${encodeURIComponent(productId)}`);
//     const data = await res.json();
//     if (res.ok) {
//       document.getElementById("queueInfo").textContent = `🔥 Current queue size: ${data.queueLength}`;
//     } else {
//       document.getElementById("queueInfo").textContent = "🔥 Current queue size: 0";
//     }
//   } catch (err) {
//     console.error("❌ Error loading queue size:", err);
//   }
// }

// // ✅ Function to add the product to the cart
// function addToCart(image, name, discountedPrice) {
//   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
//   // ✅ Add the discounted product to the cart
//   cartItems.push({
//     image: "image/" + image,
//     name: name,
//     price: discountedPrice,
//     quantity: 1
//   });

//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

