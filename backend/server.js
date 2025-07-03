const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: 'http://127.0.0.1:5502',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Importing Routes
const authRoutes = require('./routes/authRoutes');
const unlockQueueRoutes = require('./routes/unlockqueue');
const dealRoutes = require('./routes/deals');

// ✅ Using Routes
app.use('/api/auth', authRoutes);
app.use('/api/unlock-queue', unlockQueueRoutes);
app.use('/api/deals', dealRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

