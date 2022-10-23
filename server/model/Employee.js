const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  empID: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("Employee", userSchema);

// [
//   {
//     type: String,
//     default: "Employee",
//   },
// ],
