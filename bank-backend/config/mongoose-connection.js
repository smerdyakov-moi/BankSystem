require('dotenv').config()

const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const mongoURI = process.env.MONGODB_URI;


mongoose
  .connect(mongoURI)
  .then(() => dbgr("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
