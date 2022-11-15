const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    levelID: {
      type: String,
      required: true,
    },
    levelNum: {
      type: String,
      required: true,
    },
    departmentID: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Level", userSchema);
