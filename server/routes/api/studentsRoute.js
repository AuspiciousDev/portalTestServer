const express = require("express");
const router = express.Router();
const studentController = require("../../controller/studentsController");

router.get("/", studentController.getAllStudents);
router.get("/search/:studID", studentController.getStudentByID);
router.post("/register", studentController.createNewStudent);
router.patch("/update/:studID", studentController.updateStudentByID);
router.delete("/delete/:studID", studentController.deleteStudentByID);
module.exports = router;
