const express = require("express");
const router = express.Router();
const departmentController = require("../../controller/departmentController");

router.get("/", departmentController.getAllDoc);
router.patch("/update", departmentController.updateDocByID);
router.get("/search", departmentController.getDocByID);
router.post("/register", departmentController.createDoc);
router.delete("/delete", departmentController.deleteDocByID);
router.patch("/status", departmentController.toggleStatusById);

module.exports = router;
