console.log("hello");
const os = require("os");
console.log(`os Type: ${os.type()}`);
console.log(`os Version: ${os.version()}`);
console.log(` os HomeDirectory: ${os.homedir()}`);

//There are other variables we have access to like

console.log(__dirname);
console.log(__filename);

const path = require("path");

console.log(path.dirname(__filename)); //__dirname will give the same result
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));

//Path gives us object with all the information like this
// {
//     root: 'D:\\',
//     dir: 'D:\\Builds\\Node_Playground',
//     base: 'server.js',
//     ext: '.js',
//     name: 'server'
//   }

//To run - node server or node server.js
