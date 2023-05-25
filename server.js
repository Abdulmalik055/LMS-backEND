const express = require("express");
const mongoose = require("mongoose");
const app = express();
// ===| models |===
const Course = require("./models/Course");
const apiRouter = require("./routes/Rapi");
const courseRouter = require("./routes/RCourses");
const incorrectRouter = require("./routes/RInstructor");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//.env
require("dotenv").config();
mongoose.connect(process.env.DB_URL)
.then(() => {
        console.log("======== || connction || ========");
      })
.catch((error) => {
        console.log("======== || Error || ========");
        console.log(error);
        console.log("======== || Error || ========");
      });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: process.env.JWT_SECRET,})
);
// ====================== || home page || ======================
app.get("/", (req, res) => {
  res.redirect("/user/allCourse");
});
app.get("/user/allCourse", (req, res) => {
  Course.find().then((courses) => {
    res.render("allCourseUser", { allCourses: courses });
  });
});
// ====================== || home page || ======================

// ====================== || MVC || ======================
app.use("/instructor", incorrectRouter);
app.use("/instructor/course", courseRouter);
app.use("/api", apiRouter);
// ====================== || MVC || ======================

// ====================== || Listen || ======================
app.listen(process.env.PORT, () => {
  console.log("======== || Listen || ========");
});
// ====================== || Listen || ======================
