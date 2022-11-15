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
    status: {
      type: Boolean,
      default: true,
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
