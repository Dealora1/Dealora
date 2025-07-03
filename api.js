const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ✅ NEW

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // ✅ NEW

// ✅ Connect to MongoDB
mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes); // ✅ mounts /api/orders
const API_BASE = 'http://localhost:3000/api';
