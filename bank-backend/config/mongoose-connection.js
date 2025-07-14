require("dotenv").config();
console.log("Connecting to:", process.env.MONGODB_URI);

const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    dbgr("MongoDB connected");
    console.log("✅ DB Name:", mongoose.connection.name);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
