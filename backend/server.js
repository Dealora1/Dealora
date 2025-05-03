const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const unlockQueueRoutes = require('./routes/unlockqueue');
app.use('/api/unlock-queue', unlockQueueRoutes); // ✅ أضفنا هذا

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.listen(3000, () => console.log(`✅ Server running on http://localhost:3000`));

