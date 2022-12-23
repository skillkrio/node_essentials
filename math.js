// One way of exporting  module
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.division = (a, b) => a / b;

//Another way of exporting module
module.exports = { add, subtract, multiply, division };
