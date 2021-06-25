const { Client } = require('discord.js');
const TOKENS = require("../private/tokens");
const bot = new Client();

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}.`);
});

console.log("Starting bot instance.")
// Discord Login request
bot.login(TOKENS.CLIENTS.HSE_BOT);

module.exports = { bot };

require("./core/commands");
require("./core/events");
const { Twitter } = require("./core/twitter");
if (TOKENS.TWITTER.ACCESS_TOKEN == "" || TOKENS.TWITTER.ACCESS_TOKEN_SECRET == "" || TOKENS.TWITTER.CONSUMER_KEY == "" || TOKENS.TWITTER.CONSUMER_SECRET == "") {
    console.log("\x1b[33mWARN:\x1b[0m It seems your Twitter credentials are unset, are you in dev mode ? Please setup your credentials if you are in production.");
} else {
    Twitter();
}