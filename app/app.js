const { Client } = require('discord.js');
const TOKENS = require("../private/tokens");
const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

console.log("Starting bot instance.")

client.login(TOKENS.CLIENTS.HSE_BOT);