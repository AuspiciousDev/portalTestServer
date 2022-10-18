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
  lastName: {
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
