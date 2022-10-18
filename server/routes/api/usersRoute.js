const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController");

router.get("/", usersController.getAllUsers);
router.get("/role", usersController.getAllUserByRole);
router.get("/search/:userNum", usersController.getUserByID);

router.post("/register", usersController.createNewUser);
router.delete("/delete/:userNum", usersController.deleteUserByID);

module.exports = router;
