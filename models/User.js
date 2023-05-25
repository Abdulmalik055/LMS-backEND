const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheama = new Schema({
  username: String,
  password: String,
  email: String,
  courses: [
    {
      
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      
    },
  ],
});

const User = mongoose.model("user", userScheama);
module.exports = User;
