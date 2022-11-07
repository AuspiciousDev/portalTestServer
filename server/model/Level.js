const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    levelID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Level", userSchema);
