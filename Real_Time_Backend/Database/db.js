const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MongoDB URI not found! Check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI); // No options needed in Mongoose v8+
    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;