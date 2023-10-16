const express = require("express");
const router = express.Router();
const data = {};

data.employees = require("../../fakedb/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({ firstName: req.body.firstName, lastName: req.body.lastName });
  })
  .put((req, res) => {
    res.json({ firstName: req.body.firstName, lastName: req.body.lastName });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

//Named parameter routes

//I am using get http method you can use it with any http method
router.route("/:id").get((req, res) => {
  //req.body.id should not be used here when we are working with Named params.
  res.json({ id: req.params.id });
});

module.exports = router;
