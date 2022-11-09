const express = require("express");
const router = express.Router();
const activeStudentController = require("../../controller/activeStudentController");
router.get("/", activeStudentController.getAllDoc);
router.post("/register", activeStudentController.createDoc);

// router.patch("/update", activeStudentController.updateDocByID);
// router.get("/search", activeStudentController.getDocByID);
router.delete("/delete/", activeStudentController.deleteDocByID);

module.exports = router;
