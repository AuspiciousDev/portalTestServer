const express = require("express");
const router = express.Router();
const studentController = require("../../controller/studentsController");

router.get("/", studentController.getAllStudents);
router.get("/search/:id", studentController.getStudentsByID);

router.post("/register", studentController.createNewStudent);
router.post("/delete", studentController.deleteStudentByID);
module.exports = router;
