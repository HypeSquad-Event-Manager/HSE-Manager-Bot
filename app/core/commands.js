const { bot } = require("../app");
const CONFIG = require("../config");
const fs = require("fs");
const { PREFIX } = require("../config");
const { noPermission } = require("./functions/commands_errors");
let Commands = new Object();

// This function scans the ./app/commands folder ands loads every commands into the Commands object
console.log("Loading commands...");
fs.readdir("./app/commands/", (err, files) => {
    if (err) throw err;
    if (files.length < 1) return console.log("\x1b[31mError:\x1b[0m No command files found");
    for (let file of files) {
        if (file.startsWith("-")) continue;
        if (!file.endsWith(".js")) continue;
        const cmd_name = file.split(".")[0];
        const cmd = require(`../commands/${file.slice(0, -3)}`).commands;
        Commands = Object.assign(Commands, cmd);
        console.log(`Loaded command \x1b[33m${cmd_name}\x1b[0m`);
    }
});

// This function is called everytime a user send a message, and trigger a command if the user calls one
bot.on("message", async message => {
    if (message.author.bot || message.content.length === 1 || message.system || message.tts) return;
    if (!message.content.startsWith(CONFIG.PREFIX)) return;
    let args = message.content.replace(CONFIG.PREFIX, "").split(/ +/);
    const command_ = args[0].toLowerCase();
    let command;
    if (typeof Commands[command_] == "function") {
        command = new Commands[command_]();
    } else if (typeof Commands[command_] == "string") {
        command = new Commands[Commands[command_]]();
    } else return;
    if (!bot.guilds.cache.get(CONFIG.HSE_MANAGER_GUILD).members.cache.get(message.author.id).roles.cache.get(CONFIG.VERIFIED_ROLE) && args[0].toLowerCase() !== "verify") return message.channel.send("Sorry but you can't execute that command before you verify yourself");
    if (command.permission && !message.member.hasPermission(command.permission)) return message.channel.send(noPermission());
    try {
        await command.execute(message, args);
    } catch (e) {
        console.log("\x1b[41mThe bot encountered an error:\x1b[0m\n" + e);
    }
});
