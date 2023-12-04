const allowedOrigin = require("./allowed_origin");
//!origin is used to allow the localhost origin. Remove it in production
const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("You are Not allowed"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOption;
