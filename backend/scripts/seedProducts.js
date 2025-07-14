const mongoose = require('mongoose');
const Deal = require('../models/dealModel');

const MONGO_URI = 'your-mongodb-atlas-uri';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    productId: 'nintendo-switch',
    productName: 'Nintendo Switch',
    requiredCount: 50,
    discountPercentage: 0.2
  },
  {
    productId: 'soft-jacket',
    productName: 'Soft Jacket',
    requiredCount: 10,
    discountPercentage: 0.15
  },
  {
    productId: 'utility-jacket',
    productName: 'Utility Jacket',
    requiredCount: 5,
    discountPercentage: 0.3
  },
  {
    productId: 'linen-jacket',
    productName: 'Linen Jacket',
    requiredCount: 8,
    discountPercentage: 0.25
  },
  // add more products here
];

async function seed() {
  try {
    await Deal.insertMany(products);
    console.log('✅ Products inserted successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
