const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    studID: {
      type: String,
      required: true,
    },
    LRN: {
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
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    suffix: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },

    mobile: {
      type: String,
    },
    emergencyName: {
      type: String,
    },
    emergencyRelationship: {
      type: String,
    },
    emergencyNumber: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", userSchema);

// [
//   {
//     type: String,
//     default: "Employee",
//   },
// ],
