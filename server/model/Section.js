const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    sectionID: {
      type: String,
      required: true,
    },
    departmentID: {
      type: String,
      required: true,
    },
    levelID: {
      type: String,
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", userSchema);
