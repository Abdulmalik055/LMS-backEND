const express = require("express");
const router = express.Router();
const controller = require("../controllers/Ccourse");

// ====================== ||  create Course || ======================
router.get("/create/:userId" , controller.creatCourse);
router.post("/create/post/:userId",controller.postCreatCourse)
// ====================== ||  create Course || ======================

// ====================== || Details || ======================
router.get("/details/:detailsId/:userId", controller.details)
// ====================== || Details || ======================

// ====================== || Delete || ======================
router.get("/delete/:deleteId/:userId", controller.delete)
// ====================== || Delete || ======================

// ====================== || Update || ======================
router.get("/update/:updateId/:userId", controller.update)


router.post("/update/:updateId/:userId", controller.postUpdate)
  // ====================== || Update || ======================
  
// ====================== || Update || ======================


module.exports = router;
