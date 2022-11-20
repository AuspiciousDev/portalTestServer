const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    GradingID: {
      type: String,
      required: true,
    },
    GradeType: {
      type: String,
      required: true,
    },
    GradeMultiplier: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Grading", userSchema);
