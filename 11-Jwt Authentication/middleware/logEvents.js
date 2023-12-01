//Npm Modules/package
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
// uuid is an alias name for v4 module

//Common Core Modules
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
//Custom event logger
const logEvents = async (message, logNameWithExt) => {
  const dateTime = format(new Date(), "MM/dd/yyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logNameWithExt),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = { logger, logEvents };
