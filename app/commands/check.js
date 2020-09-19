const { checkHypeSquadBadge } = require("../core/functions/check_badge");
const { MessageEmbed } = require("discord.js");
const CONFIG = require("../config");

class check {
    constructor() { }
    async execute(message, args) {
        let isHse = await checkHypeSquadBadge(message.member);
        let embed = new MessageEmbed();
        if (message.member.roles.cache.get(CONFIG.HSE_ROLE)) {
            embed.setTitle("Oops...").setDescription("It seems you already have the HypeSquad Event role. You don't need to use that command 😉").setColor("#eb4034");
        }
        else if (isHse) {
            embed.setTitle("Congratulation !").setDescription("We added you the HypeSquad Events role ! <a:ahypesquad:738131212375294004>").setColor("#42d624");
        }
        else {
            embed.setTitle("Oops...").setDescription("It seems you do not have the HypeSquad Events badge... But you can apply for it [here](https://discord.com/hypesquad).").setColor("#eb4034");
        }
        message.channel.send(embed);
    }
}

module.exports.commands = { check };