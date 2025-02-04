import mongoose from "mongoose";

const localSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  spentBudget: { type: Number, required: true },
  remainingBudget: {
    type: Number,
    required: true,
    default: function () {
      return this.totalBudget - this.spentBudget;
    },
  },
});

const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  totalBudget: { type: Number, required: true },
  spentBudget: { type: Number, required: true },
  remainingBudget: {
    type: Number,
    required: true,
    default: function () {
      return this.totalBudget - this.spentBudget;
    },
  },
  locals: [localSchema],
});

const Province = mongoose.model("Province", provinceSchema);

module.exports = Province;
