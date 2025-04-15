import express from "express";
import { Complaint } from "../models/complaint.js"; 

const router = express.Router();

// POST: Save complaint
const addComplaint = async (req, res) => {
    console.log("Received complaint data:", req.body); 
  try {
    const {
      name,
      level,
      yourName,
      yourEmail,
      complaintDescription
    } = req.body;

    const complaint = new Complaint({
      name,
      level,
      yourName,
      yourEmail,
      complaintDescription
    });


    const savedComplaint = await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: savedComplaint
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit complaint",
      error: error.message
    });
  }
};

// GET: Fetch all complaints by name
const getComplaintByName = async (req, res) => {
    let { identifier } = req.params;
    
    console.log("Fetching complaints for:", identifier);
  
    try {
      const complaints = await Complaint.find({ name: identifier });
  
      if (complaints.length === 0) {
        return res.status(404).json({
          message: `No complaints found for ${identifier}`
        });
      }
  
      res.status(200).json({
        message: "Complaints found successfully",
        complaints
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch complaints",
        error: error.message
      });
    }
  };
  
export{addComplaint,getComplaintByName};

export default router;
