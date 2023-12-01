const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); //Invalid/missing credentials
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedSuccess) => {
    if (err) return res.sendStatus(403); //forbidden(invalid token)
    req.username = decodedSuccess.username;
    next();
  });
};
module.exports = verifyJwt;
