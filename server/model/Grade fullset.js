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
    schoolYearID: {
      type: String,
      required: true,
    },
    allGrades: [
      {
        quarter1: {
          type: Number,
          default: 0,
        },
        quarter2: {
          type: Number,
          default: 0,
        },
        quarter3: {
          type: Number,
          default: 0,
        },
        quarter4: {
          type: Number,
          default: 0,
        },
      },
    ],
    finalGrade: {
      type: Number,
    },
    remark: {
      type: Boolean,
      default: false,
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
