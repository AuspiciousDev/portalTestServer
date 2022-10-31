const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  schoolYearID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("SchoolYear", userSchema);
