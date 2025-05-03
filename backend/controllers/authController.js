const User = require('../models/userModel');

// ✅ Register new user
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = new User({ username, password, role });
  await user.save();

  res.status(201).json({ message: 'User registered successfully', userId: user._id });
};

// ✅ Login existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', role: user.role });
};

// ✅ Get all users (for Postman testing or admin panel)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
