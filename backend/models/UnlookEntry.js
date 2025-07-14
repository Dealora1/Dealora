// routes/unlockQueue.js (example)
const express = require('express');
const router = express.Router();
const Deal = require('../models/dealModel');
const UnlockEntry = require('../models/UnlockEntry'); // If you still want to use this model

// Join to Unlock API
router.post('/join', async (req, res) => {
    const { productId, email } = req.body;

    try {
        // Find the deal by productId
        const deal = await Deal.findOne({ productId });

        if (!deal) {
            return res.status(404).json({ message: "Deal not found." });
        }

        // Check if the user is already in the joinedUsers array
        if (deal.joinedUsers.includes(email)) {
            return res.status(400).json({ message: "You have already joined this deal." });
        }

        // Add the user to the joinedUsers array using $addToSet
        await Deal.updateOne(
            { productId },
            { $addToSet: { joinedUsers: email } } // $addToSet prevents duplicate entries
        );

        // Optionally, save to queue collection for logging
        await UnlockEntry.create({ email, productId });

        res.status(200).json({ message: `Joined the queue! ${deal.joinedUsers.length + 1} users have joined.` });
    } catch (error) {
        console.error("Error joining deal:", error);
        res.status(500).json({ message: "Error joining the queue." });
    }
});

module.exports = router;
