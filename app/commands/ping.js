const { bot } = require("../app");
const { MessageEmbed } = require("discord.js");

class ping {
    constructor() {

    }
    async execute(message, args) {
        let m = await message.channel.send("Calculating ping...");
        m.edit(new MessageEmbed().setDescription(`My latency is ${m.createdTimestamp - message.createdTimestamp}ms (Client Latency: **${Math.round(bot.ws.ping)}**)`).setColor("#2F3136"))
    }
}

module.exports.commands = { ping };