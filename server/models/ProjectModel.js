import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  allocatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  allocatedAmount: { type: Number, required: true },
  endDate: { type: String, required: true },  // Expected completion date
  completionRate: { type: Number, required: true },
},{ timestamps: true });


// Export model
const Project = mongoose.model("Project", ProjectSchema);

export { Project };
