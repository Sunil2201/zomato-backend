require('dotenv').config();
const mongoose = require("mongoose");

// Access your MongoDB connection string from secrets
const mongoURI = process.env.MONGODB;

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Zomato",
    });
    if (connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = { dbConnection };
