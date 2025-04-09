const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.Mongo_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("MongoDB connection failed:", err);
});

module.exports = {
  connection,
};
