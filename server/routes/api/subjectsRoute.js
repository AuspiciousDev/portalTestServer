const express = require("express");
const router = express.Router();
const subjectController = require("../../controller/subjectController");

router.get("/", subjectController.getAllDoc);
router.get("/search/:searchID", subjectController.getDocByID);
router.post("/register", subjectController.createDoc);
router.patch("/update/:searchID", subjectController.updateDocByID);
router.delete("/delete/:searchID", subjectController.deleteDocByID);

module.exports = router;
