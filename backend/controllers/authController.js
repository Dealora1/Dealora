const User = require('../models/userModel');

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

exports.login = async (req, res) => {
  res.status(200).json({ message: 'Login endpoint working ✅' });
};
