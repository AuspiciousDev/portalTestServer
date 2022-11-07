const express = require("express");
const router = express.Router();
const levelController = require("../../controller/levelController");

router.get("/", levelController.getAllDoc);
router.patch("/update", levelController.updateDocByID);
router.get("/search", levelController.getDocByID);
router.post("/register", levelController.createDoc);
router.delete("/delete", levelController.deleteDocByID);

module.exports = router;
