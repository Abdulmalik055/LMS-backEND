const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Instructor = require("../models/Instructor");

module.exports = {
  // ====================== || Instructor Register || ======================
  register: (req, res) => {
    res.render("register");
  },

  postRegister: (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const user = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt
      .hash(password, saltRounds)
      .then((instructorBcrypt) => {
        Instructor.create({
          _id: id,
          username: user,
          password: instructorBcrypt,
          email: email,
        });
        req.session.currentUser;
        res.redirect(`/instructor/allCourses/${id}`);
      })
      .catch((error) => {
        res.send("instructor register error", error);
      });
  },
  // ====================== || Instructor Register || ======================

  // ====================== || Instructor login || ======================
  login: (req, res) => {
    res.render("login.ejs");
  },

  postLogin: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Instructor.findOne({ username })

      .then((foundInstructor) => {
        if (!foundInstructor) {
          res.send("user not found");
          return;
        }
        const encryptPassword = foundInstructor.password;

        bcrypt
          .compare(password, encryptPassword)
          .then((response) => {
            if (response == true) {
              req.session.currentUser;
              res.redirect(`/instructor/allCourses/${foundInstructor._id}`);
            } else res.send("password is not ");
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  // ====================== || Instructor login || ======================

  // ====================== || Instructor logout || ======================
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/instructor/login");
  },
  // ====================== || Instructor logout || ======================

  // ====================== || allCourses || ======================
  allCourses: (req, res) => {
    const id = req.params.id;
    Instructor.findOne({ _id: id })
      .populate("courses")
      .then((foundUser) => {
        console.log(foundUser);

        res.render("allCourse", { allCourses: foundUser.courses, userId: id });

      });
  },
  // ====================== || allCourses || ======================
};
