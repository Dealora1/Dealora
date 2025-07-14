// ✅ Importing Required Modules
const User = require('../models/userModel'); 

// ✅ User Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('🚀 Login Attempt (Server Side):', { username, password });

  try {
    // ✅ Check if user exists
    const user = await User.findOne({ username });
    console.log('🔍 User Found:', user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Verify Password (Direct Comparison)
    console.log('🔑 Comparing passwords:', password, user.password);
    if (password !== user.password) {
      console.log('❌ Incorrect password');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Role Verification (Seller only)
    if (user.role !== 'seller') {
      console.log('❌ Access denied. Not a seller');
      return res.status(403).json({ message: "Access denied. Only sellers can access this page." });
    }

    console.log('✅ Login successful:', user);
    res.status(200).json({ 
      message: "Login successful", 
      role: user.role,
      username: user.username 
    });
  } catch (error) {
    console.error('❌ Login error (Server Error):', error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User Registration Controller
exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  console.log('🚀 Registration Attempt:', { username, password });

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Create a new user
    const newUser = new User({
      username,
      password, // كلمة المرور كنص عادي بدون تشفير
      role: role || 'seller'
    });

    await newUser.save();
    console.log('✅ Registration successful:', newUser);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: "Server error" });
  }
};













































// // ✅ Importing Required Modules
// const User = require('../models/userModel'); 

// // ✅ User Registration Controller
// exports.register = async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     // ✅ Check if user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Create a new user without password hashing
//     const newUser = new User({
//       username,
//       password, // ✅ كلمة المرور كنص عادي
//       role: role || 'seller'
//     });

//     await newUser.save();
//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ User Login Controller
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // ✅ Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ Verify Password (Without Hashing)
//     if (password !== user.password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ Role Verification (Seller only)
//     if (user.role !== 'seller') {
//       return res.status(403).json({ message: "Access denied. Only sellers can access this page." });
//     }

//     res.status(200).json({ 
//       message: "Login successful", 
//       role: user.role,
//       username: user.username 
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };





































// // ✅ Importing Required Modules
// const User = require('../models/userModel'); 
// const bcrypt = require('bcrypt');

// // ✅ User Registration Controller
// exports.register = async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     // ✅ Check if user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Hash Password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Create a new user
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       role: role || 'seller'
//     });

//     await newUser.save();
//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ User Login Controller
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // ✅ Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ Verify Password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ Role Verification (Seller only)
//     if (user.role !== 'seller') {
//       return res.status(403).json({ message: "Access denied. Only sellers can access this page." });
//     }

//     res.status(200).json({ 
//       message: "Login successful", 
//       role: user.role,
//       username: user.username 
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

