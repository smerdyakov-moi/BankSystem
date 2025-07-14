require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectWithTimeout = async () => {
  console.log('Starting mongoose connect...');
  try {
    await Promise.race([
      mongoose.connect(mongoURI),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout connecting to MongoDB')), 10000))
    ]);
    console.log('MongoDB connected successfully!');
    process.exit(0); // exit after success
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // exit with failure
  }
};

connectWithTimeout();
