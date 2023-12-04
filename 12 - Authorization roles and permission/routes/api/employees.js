const express = require("express");
const router = express.Router();
const employeesController = require("../../controller/employeesController");
const verifyRoles = require("../../middleware/verify_roles");
const ROLES_LIST = require("../../configuration/roles_list");
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

//Named parameter routes

//I am using get http method you can use it with any http method
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
