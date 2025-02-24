import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  level: {
    type: String,
    enum: ["National", "Province", "Local", "Ministry"],
    required: true,
  },
  name: {
    type: String,
    required: function () {
      return this.level !== "National"; // Name is required only if level is not National
    },
  },
});

// Hash the password before saving (if needed, similar to previous examples)
// UserSchema.pre("save", async function (next) {
//   // Hashing logic
// });

// Export model
const User = mongoose.model("User", UserSchema);

export { User };
