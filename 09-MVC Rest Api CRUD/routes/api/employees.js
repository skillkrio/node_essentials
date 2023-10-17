const express = require("express");
const router = express.Router();
const employeesController = require("../../controller/employeesController");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

//Named parameter routes

//I am using get http method you can use it with any http method
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
