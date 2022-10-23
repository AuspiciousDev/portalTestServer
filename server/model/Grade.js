const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  gradeID: {
    type: Number,
    required: true,
  },
  empID: {
    type: Number,
    required: true,
  },
  subjectID: {
    type: String,
    required: true,
  },
  schoolYear: {
    type: Number,
    required: true,
  },
  Level: {
    type: Number,
    required: true,
  },
  Grades: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Grade", userSchema);
