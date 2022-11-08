const express = require("express");
const router = express.Router();
const employeesController = require("../../controller/employeesController");

router.get("/", employeesController.getAllEmployees);
router.get("/search/:empID", employeesController.getEmployeeByID);
router.post("/register", employeesController.createNewEmployee);
router.patch("/update/:empID", employeesController.updateEmployeeByID);
router.delete("/delete", employeesController.deleteEmployeeByID);

module.exports = router;
