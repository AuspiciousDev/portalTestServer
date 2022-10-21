const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "employee",
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);

// [
//   {
//     type: String,
//     default: "Employee",
//   },
// ],