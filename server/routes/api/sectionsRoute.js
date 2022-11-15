const express = require("express");
const router = express.Router();
const sectionController = require("../../controller/sectionController");

router.get("/", sectionController.getAllDoc);
router.patch("/update", sectionController.updateDocByID);
router.get("/search", sectionController.getDocByID);
router.post("/register", sectionController.createDoc);
router.patch("/status", sectionController.toggleStatusById);
router.delete("/delete/", sectionController.deleteDocByID);

module.exports = router;
