const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  studID: {
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
  

  refreshToken: String,
});

module.exports = mongoose.model("Student", userSchema);

// [
//   {
//     type: String,
//     default: "Employee",
//   },
// ],