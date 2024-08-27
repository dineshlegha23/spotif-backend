const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected!");
  } catch (err) {
    console.log(`Database Error : ${err}`);
  }
};

module.exports = connectDB;
