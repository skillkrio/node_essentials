const { format } = require("date-fns");

const { v4: uuid } = require("uuid");

console.log(format(new Date(), "MM/dd/yyyy"));
console.log(uuid());
