const fs = require("fs");
const path = require("path");

const readStream = fs.createReadStream(
  path.join(__dirname, "streamrelatedfiles", "lorem.txt"),
  { encoding: "utf8" }
);

const writeStream = fs.createWriteStream(
  path.join(__dirname, "streamrelatedfiles", "stream_generated_file.txt")
);

// readStream.on("data", (dataChunk) => {
//   writeStream.write(dataChunk);
// });

readStream.pipe(writeStream);
