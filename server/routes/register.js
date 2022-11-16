const express = require("express");
const router = express.Router();
const registerUserController = require("../controller/registerUserController");

router.post("/", registerUserController.createNewUser);

module.exports = router;
