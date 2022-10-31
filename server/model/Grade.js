const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  gradeID: {
    type: String,
    required: true,
  },
  empID: {
    type: String,
    required: true,
  },
  subjectID: {
    type: String,
    required: true,
  },
  schoolYear: {
    type: String,
    required: true,
  },
  Level: {
    type: String,
    required: true,
  },
  Grades: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Grade", userSchema);
