import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const conn = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("connection error:", err));
};

export { conn };
