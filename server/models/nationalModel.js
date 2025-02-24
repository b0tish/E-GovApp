import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["National", "Province", "Local", "Ministry"],
  }, // Defines the level of budget

  name: {
    type: String,
    required: function () {
      return this.level !== "National";
    }, // Required only for Province, Local, and Ministry
    unique: true,
  },

  date: { type: Number, required: true, unique: true }, // Year like 2080, 2081

  EstimatedBudget: {
    totalBudget: { type: Number, required: true }, // in Lakh
    capitalExpenditure: { type: Number, required: true },
    recurrentExpenditure: { type: Number, required: true },
    financialExpenditure: { type: Number, required: true },
  },

  ExpectedRevenue: {
    total: { type: Number, required: true ,default:0},
    taxRevenue: { type: Number, required: true ,default:0},
    nonTax: { type: Number, required: true ,default:0},
    grants: { type: Number, required: true ,default:0},
    other: { type: Number, required: true ,default:0},
  },

  CurrentExpenditure: {
    total: { type: Number, default: 0 },
    capitalExpenditure: { type: Number, default: 0 },
    recurrentExpenditure: { type: Number, default: 0 },
    financialExpenditure: { type: Number, default: 0  },
  },

  CurrentRevenue: {
    total: { type: Number,default:0},
    taxRevenue: { type: Number,default:0},
    nonTax: { type: Number ,default:0},
    grants: { type: Number,default:0},
    other: { type: Number ,default:0},
  },
});

// Export model
const BudgetSchema = mongoose.model("BudgetSchema", budgetSchema);
export { BudgetSchema };
