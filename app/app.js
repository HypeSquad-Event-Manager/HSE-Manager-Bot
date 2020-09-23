const { Client } = require('discord.js');
const TOKENS = require("../private/tokens");
const bot = new Client();

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);
});

console.log("Starting bot instance.")
// Discord Login request
bot.login(TOKENS.CLIENTS.HSE_BOT);

module.exports = { bot };

require("./core/commands");
require("./core/events");
const { Twitter } = require("./core/twitter");
Twitter();