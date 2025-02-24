import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["National", "Province", "Local", "Ministry"],
  },

  name: {
    type: String,
    required: function () {
      return this.level !== "National";
    },
  },

  date: { type: Number, required: true }, // Year like 2080, 2081

  EstimatedBudget: {
    total: { type: Number, required: true }, // in Lakh
    capitalExpenditure: { type: Number, required: true },
    recurrentExpenditure: { type: Number, required: true },
    financialExpenditure: { type: Number, required: true },
  },

  ExpectedRevenue: {
    total: { type: Number, required: true, default: 0 },
    taxRevenue: { type: Number, required: true, default: 0 },
    nonTax: { type: Number, required: true, default: 0 },
    grants: { type: Number, required: true, default: 0 },
    other: { type: Number, required: true, default: 0 },
  },

  CurrentExpenditure: {
    total: { type: Number, default: 0 },
    capitalExpenditure: { type: Number, default: 0 },
    recurrentExpenditure: { type: Number, default: 0 },
    financialExpenditure: { type: Number, default: 0 },
  },

  CurrentRevenue: {
    total: { type: Number, default: 0 },
    taxRevenue: { type: Number, default: 0 },
    nonTax: { type: Number, default: 0 },
    grants: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
});

budgetSchema.index(
  { date: 1, level: 1 },
  { unique: true, partialFilterExpression: { level: "National" } }
);

// Unique constraint: Other levels (unique per year + name)
budgetSchema.index(
  { date: 1, name: 1 },
  {
    unique: true,
    partialFilterExpression: { name: { $exists: true, $ne: null } },
  }
);

// Unique index for National level (same year cannot exist twice)


// Export model
const BudgetSchema = mongoose.model("BudgetSchema", budgetSchema);
export { BudgetSchema };
