import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  allocatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  allocatedAmount: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },  // Expected completion date
  completionRate: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now , required: true}
});


// Export model
const Project = mongoose.model("Project", ProjectSchema);

export { Project };
