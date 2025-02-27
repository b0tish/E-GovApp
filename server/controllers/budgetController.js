import { BudgetSchema } from "../models/budgetSchema.js";

const addbudget = async (req, res) => {
  try {
    const {
      level,
      name,
      date,
      EstimatedBudget,
      ExpectedRevenue,
      CurrentExpenditure,
      CurrentRevenue,
    } = req.body;

    // Validate 'level'
    const validLevels = ["National", "Province", "Local", "Ministry"];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ message: "Invalid level parameter" });
    }

    // Create a new budget entry
    const newBudget = new BudgetSchema({
      level,
      name: level === "National" ? undefined : name, // Name should be undefined for National
      date,
      EstimatedBudget,
      ExpectedRevenue,
      CurrentExpenditure,
      CurrentRevenue,
    });

    // Save the document to the database
    await newBudget.save();

    return res
      .status(201)
      .json({ message: "Budget added successfully", data: newBudget });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getDataByLevel = async (req, res) => {
  const { identifier} = req.params; // Get level and year from request parameters
  try {
    // Fetch the budget data matching the level and year
    const data = await BudgetSchema.find({ level : identifier});

    if (!data) {
      return res
        .status(404)
        .json({ message: "No data found for the specified level and year." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getDataByName = async (req, res) => {
  const { identifier } = req.params; // Get level and year from request parameters
  try {
    // Fetch the budget data matching the level and year
    const formattedName=  identifier.charAt(0).toUpperCase() + identifier.slice(1);
    const data = await BudgetSchema.find({ name:formattedName });

    if (!data) {
      return res
        .status(404)
        .json({ message: "No data found for the specified level and year." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


const updateBudgetById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  
  const updatedData = req.body; // Get the updated data from the request body
 


  try {
    // Find the budget by ID and update it
    const updatedBudget = await BudgetSchema.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update
    });

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({
      message: "Budget updated successfully",
      budget: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export{addbudget,getDataByLevel,getDataByName,updateBudgetById};
