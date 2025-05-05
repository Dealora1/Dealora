const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Configure CORS before routes
app.use(cors({
  origin: 'http://127.0.0.1:5501',  // Match your frontend Live Server origin
  methods: ['GET', 'POST'],
  credentials: false
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const dealRoutes = require('./routes/dealRoutes');
app.use('/api/deals', dealRoutes);

const unlockQueueRoute = require('./routes/unlockQueueRoute');
app.use('/api/unlock', unlockQueueRoute);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(3000, () => {
      console.log('✅ Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });

