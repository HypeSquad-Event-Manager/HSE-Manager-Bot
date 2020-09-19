const { captchaSystem } = require("../core/functions/captcha");
const CONFIG = require("../config");

class verify {
    constructor() {

    }
    async execute(message, args) {
        if (message.guild.id !== CONFIG.HSE_MANAGER_GUILD || message.author.bot) return;
        if (message.guild.members.cache.get(message.author.id).roles.cache.get(CONFIG.VERIFIED_ROLE)) return message.channel.send("You're already verified, no need to do that");
        captchaSystem(message.member);
        message.channel.send("You received another captcha.");
    }
}

module.exports.commands = { verify };
