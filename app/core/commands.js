const { bot } = require("../app");
const fs = require("fs");
let Commands = new Object();

// This function scans the ./app/commands folder ands loads every commands into the Commands object
console.log("Loading commands...");
fs.readdir("./app/commands/", (err, files) => {
    if (err) throw err;
    for (file of files) {
        if (file.startsWith("-")) continue;
        if (!file.endsWith(".js")) continue;
        const cmd_name = file.split(".")[0];
        const cmd = require(`../../Commands/${i}/${file.slice(0, -3)}`).commands;
        Commands = Object.assign(Commands, cmd);
        console.log(`Loaded command \x1b[33m${cmd_name}`);
    }
});
