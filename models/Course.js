const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const courseSchema = new Schema ({
    course : String,
    description: String,
    location:String,
})



const Course = mongoose.model ("Course" , courseSchema )
module.exports = Course