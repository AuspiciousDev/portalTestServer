const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  sectionID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Section", userSchema);
