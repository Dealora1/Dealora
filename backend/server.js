const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Use your routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // <-- Make sure this is here

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
  });
})
.catch((err) => {
  console.error('❌ DB connection error:', err);
});
