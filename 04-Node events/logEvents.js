//Npm Modules/package
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
// uuid is an alias name for v4 module

//Common Core Modules
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

//Custom event logger
const logEvents = async (message) => {
  const dateTime = format(new Date(), "MM/dd/yyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;
