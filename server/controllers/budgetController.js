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

   

    // Check if a budget entry for the given date already exists
    // const existingBudget = await BudgetSchema.findOne({ date, level, name });
    // if (existingBudget) {
    //   return res.status(400).json({
    //     message: "Budget entry for this date and level already exists",
    //   });
    // }

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
  const { level} = req.params; // Get level and year from request parameters
  try {
    // Fetch the budget data matching the level and year
    const data = await BudgetSchema.find({ level});

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
  const { name } = req.params; // Get level and year from request parameters
  try {
    // Fetch the budget data matching the level and year
    const formattedName=  name.charAt(0).toUpperCase() + name.slice(1);
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

export{addbudget,getDataByLevel,getDataByName};
