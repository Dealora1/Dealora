// ✅ Importing Required Modules
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ User Registration Route (Should be first)
router.post('/register', authController.register);

// ✅ User Login Route
router.post('/login', authController.login);

// ✅ Exporting the Router
module.exports = router;

