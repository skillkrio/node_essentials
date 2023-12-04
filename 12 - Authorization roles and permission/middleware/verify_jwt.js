const jwt = require("jsonwebtoken");
require("dotenv").config();

// req.roles is assigned in the verifyJwt middleware
const verifyJwt = (req, res, next) => {
  // const authHeader = req.headers["authorization"];Alternate ways down below
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); //Invalid/missing credentials
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedSuccess) => {
    if (err) return res.sendStatus(403); //forbidden(invalid token)
    req.username = decodedSuccess.UserInfo.username;
    req.roles = decodedSuccess.UserInfo.roles;
    next();
  });
};
module.exports = verifyJwt;
