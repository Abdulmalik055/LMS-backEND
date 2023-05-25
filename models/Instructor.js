const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  username: String,
  password: String,
  email: String,
  courses: [{
    type : mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }]
})

const Instructor = mongoose.model("Instructor", registerSchema);
module.exports = Instructor;
