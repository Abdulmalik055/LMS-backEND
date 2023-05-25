const express = require("express");
const router = express.Router();
const controller = require("../controllers/CInstructor");

// ====================== ||  Register || ======================
router.get("/register", controller.register);
router.post("/register/post", controller.postRegister);
// ====================== ||  Register || ======================

// ====================== ||  login || ======================
router.get("/login", controller.login);
router.post("/login/post", controller.postLogin);
// ====================== ||  login || ======================

// ====================== ||  logout || ======================
router.get("/logout", controller.logout);
// ====================== ||  logout || ======================

// ====================== || allCourses || ======================
router.get("/allCourses/:id", controller.allCourses);
// ====================== || allCourses || ======================

module.exports = router;
