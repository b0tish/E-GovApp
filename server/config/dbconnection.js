const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB error");
    process.exit(1);
  }
};

module.exports = conn;
