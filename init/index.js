const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

// Main function to connect to MongoDB and handle connection success/failure
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
// Connect to MongoDB using the connection URL
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Function to initialize the database
const initDB = async () => {
  // Delete all existing documents in the Listing collection
  await Listing.deleteMany({});
  // Insert initial data into the Listing collection
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

// Initialize the database
initDB();

