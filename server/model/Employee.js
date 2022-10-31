const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    empID: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    suffix: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    civilStatus: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    emergencyName: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    emergencyNumber: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", userSchema);

// [
//   {
//     type: String,
//     default: "Employee",
//   },
// ],
