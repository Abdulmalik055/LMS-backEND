const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const Course = require("../models/Course");

module.exports = {
  // ====================== || Register || ======================
  register: (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const user = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;
    const opj = { id, user, Password, Email };
    const token = jwt.sign({ opj }, process.env.JWT_SECRET);
    // res.json(token);
    bcrypt.hash(Password, saltRounds).then((encryptedPassword) => {
      User.create({
        _id: id,
        username: user,
        email: Email,
        password: encryptedPassword,
        token: token,
      }).then(() => {
        res.json({ token });
      });
    });
  },
  // ====================== || Login || ======================

  login: (req, res) => {
    // console.log(req.session.userID);
    const username = req.body.username;
    const password = req.body.password;
    // res.status(200).json({ user , password});
    User.findOne({ username })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(401).json("user not found");
          return;
        }

        const encryptedPassword = foundUser.password;

        bcrypt
          .compare(password, encryptedPassword)
          .then((response) => {
            if (response == true) {
              const token = jwt.sign({ foundUser }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              res.json({ token: token, foundUser });
              // req.session.currentUser = foundUser._id;
              // res.redirect("/allBlogs");
            } else {
              res.status(401).json("incorrect password");
            }
          })
          .catch((error) => {
            res.send(error);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  // ====================== || All Courses || ======================
  apiAllCourses: (req, res) => {
    Course.find().then((courses) => {
      res.json(courses);
    });
  },
  // ====================== || All Courses || ======================

  // ====================== || add Courses || ======================
  addCourse: (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    )
      .populate("courses")
      .then((addCourse) => {
        res.json(addCourse);
      });
  },
  // ====================== || add Courses || ======================


  // ====================== || delete Courses || ======================
  deleteCourse: (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    User.findOneAndUpdate(
      {_id:userId},
      { $pull: { courses: courseId } },
      { new: true }
    )
      .populate("courses")
      .then((addCourse) => {
        res.json(addCourse);
      });
  },
  // ====================== || delete Courses || ======================
};
