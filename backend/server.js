const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
const path = require('path');
=======
>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
require('dotenv').config();

const app = express();

<<<<<<< HEAD
app.use(express.json());
=======
// ✅ CORS Configuration
>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
app.use(cors({
  origin: 'http://127.0.0.1:5502',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

<<<<<<< HEAD
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const unlockQueueRoutes = require('./routes/unlockqueue');
const dealRoutes = require('./routes/deals');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/unlock-queue', unlockQueueRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home.html'));
});

mongoose.connect(process.env.MONGO_URI)
=======
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
>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
<<<<<<< HEAD
=======

>>>>>>> d18eae1b3237d316461ef08c194d929dc0ccf148
