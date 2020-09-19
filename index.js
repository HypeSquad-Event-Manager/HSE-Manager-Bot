const package = require("./package.json");

// Start with Stylised console output.
console.log(`Starting "\x1b[33m${package.name}\x1b[0m" app.\n\x1b[32mVersion:\x1b[0m ${package.version}\n\x1b[32mAuthor:\x1b[0m ${package.author}`); 

// Start bot instance.
require("./app/app");
//test 
