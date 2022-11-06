const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    email: {
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
    department: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Number,
        default: 1999,
      },
    ],

    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

// [
//   {
//     type: String,
//     default: "Employee",
//   },
// ],
