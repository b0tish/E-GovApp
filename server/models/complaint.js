import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  level: {
    type: String,
    required:true,
  },
  yourName: {
    type: String,
    default: null,
  },
  yourEmail: {
    type: String,
    default: null,
  },
  complaintDescription: {
    type: String,
    required: [true, "Complaint description is required"],
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
});


const Complaint= mongoose.model("Complaint", complaintSchema);

export { Complaint };
