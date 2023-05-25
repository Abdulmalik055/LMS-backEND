const express = require("express");
const router = express.Router();
const controller = require("../controllers/Capi");


// ====================== || Register || ======================
router.post("/student/register", controller.register);
// ====================== || Register || ======================

// ====================== || login || ======================
router.post("/student/login", controller.login);
// ====================== || login || ======================

// ====================== || All Courses || ======================
router.get("/user/allCourse", controller.apiAllCourses)
// ====================== || All Courses || ======================

// ====================== || add Courses || ======================
router.get("/student/addCourse/:userId/:courseId",controller.addCourse)
// ====================== || add Courses || ======================

// ====================== || add Courses || ======================
router.get("/student/deleteCourse/:userId/:courseId",controller.deleteCourse)
// ====================== || add Courses || ======================


module.exports = router;
