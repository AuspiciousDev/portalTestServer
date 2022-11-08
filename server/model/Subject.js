const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    subjectID: {
      type: String,
      required: true,
    },
    levelID: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Subject", userSchema);
