const mongoose = require("mongoose");
const Instructor = require("../models/Instructor");
const Course = require("../models/Course");

module.exports = {
  // ====================== ||  create Course || ======================
  creatCourse: (req, res) => {
    const id = req.params.userId;
    // Course.findById(id).then((course) => {
    res.render("createCourse", { userId: id });
    // });
  },
  postCreatCourse: (req, res) => {
    const course = req.body.course;
    const description = req.body.description;
    const location = req.body.location;
    Course.create({
      _id: new mongoose.Types.ObjectId(),
      course: course,
      description: description,
      location: location,
    })
      .then((newCours) => {
        const user = req.params.userId;
        Instructor.findOneAndUpdate(
          { _id: user },
          { $push: { courses: newCours._id } },
          { new: true }
        )

          .then(() => {
            res.redirect(`/instructor/allCourses/${user}`);
          })
          .catch((error) => {
            res.send("err in one to many" + error);
          });
      })
      .catch((error) => {
        res.send("err in create course" + error);
      });
  },
  // ====================== ||  create Course || ======================

  // ====================== || Details || ======================
  details: (req, res) => {
    const userId = req.params.userId;
    const id = req.params.detailsId;
    Course.findById(id).then((course) => {
      res.render("detailsCourse", { course, userId });
    });
  },
  // ====================== || Details || ======================

  // ====================== || Delete || ======================
  delete: (req, res) => {
    const userId = req.params.userId;
    const id = req.params.deleteId;
    Course.findByIdAndDelete(id).then(() => {
      res.redirect(`/instructor/allCourses/${userId}`);
    });
  },
  // ====================== || Delete || ======================

  // ====================== || Update || ======================
update: (req, res) => {
    const update = req.params.updateId;
    const userId = req.params.userId;
    Course.findById(update).then((course) => {
      res.render("updateCourse", { course, userId });
    });
  },
  
postUpdate: (req, res) => {
    const userId = req.params.userId;
    const update = req.params.updateId;
    const course = req.body.course;
    const description = req.body.description;
    const location = req.body.location;
    Course.findByIdAndUpdate(update, {
      course: course,
      description: description,
      location: location,
    })
      .then(() => {
        res.redirect(`/instructor/allCourses/${userId}`);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  // ====================== || Update || ======================
  
};
