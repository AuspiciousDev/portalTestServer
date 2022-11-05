const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    studID: {
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
    Quarter: {
      type: String,
      required: true,
    },
    Grade: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.plugin(AutoIncrement, {
  inc_field: "gradeID",
  id: "gradeNums",
  start_seq: 1000,
});
module.exports = mongoose.model("Grade", userSchema);
