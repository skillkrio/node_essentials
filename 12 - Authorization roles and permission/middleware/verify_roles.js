const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) res.sendStatus(401); //Unauthorized
    const acceptedRoles = [...allowedRoles];
    console.log(acceptedRoles);
    console.log(req.roles);
    const result = req.roles
      .map((userRole) => acceptedRoles.includes(userRole))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
