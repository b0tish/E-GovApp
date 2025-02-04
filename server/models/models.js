import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  title: String,
});

export default mongoose.model("data", schema);
