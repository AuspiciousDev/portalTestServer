const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    taskID: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    taskType: {
      type: String,
      required: true,
    },
    subjectID: {
      type: String,
      required: true,
    },
    studID: {
      type: String,
      required: true,
    },
    taskScore: {
      type: Number,
      required: true,
    },
    taskTotalScore: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", userSchema);
