const { MessageAttachment } = require("discord.js");
const { CaptchaGenerator } = require('captcha-canvas');
const { captchaSystem } = require("../core/functions/captcha");

class captcha {
    constructor() {

    }
    async execute(message, args) {
        captchaSystem(message.member)
    }
}

module.exports.commands = { captcha };
