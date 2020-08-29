const fs = require("fs");

// This function scans the app/events folder and require the files to register the events.
console.log("Loading events...");
fs.readdir("./app/events", (err, files) => {
    if (err) throw err;
    if (files.length < 1) return console.log("\x1b[41mError:\x1b[0m No event files found");
    for (file of files) {
        if (file.startsWith("-")) continue;
        file.substring(-3, 3);
        require("../events/" + file);
        console.log(`Loaded event file \x1b[33m${file}\x1b[0m`);
    }
});