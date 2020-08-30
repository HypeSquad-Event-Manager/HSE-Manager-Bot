const { MessageAttachment, MessageEmbed } = require("discord.js");
const { CaptchaGenerator } = require('captcha-canvas');
const fs = require("fs");
const { fileURLToPath } = require("url");

module.exports = {
    async captchaSystem(member) {
        const captcha = new CaptchaGenerator({ heigth: 75, width: 150 });
        const buffer = await captcha.generate();
        let attachment = new MessageAttachment(buffer, "captcha.png");
        if (!fs.existsSync("./temp")) fs.mkdirSync("./temp");
        fs.writeFileSync("./temp/captcha.png", buffer);
        await member.user.send(new MessageEmbed().setTitle("Captcha Verification").setDescription("Are you a robot ? We're not sure... Can you please verify yourself by completing this captcha ?").setColor("#2F3136").attachFiles("./temp/captcha.png").setImage("attachment://captcha.png").setFooter("Type the captcha below ⬇️"));
        fs.unlink("./temp/captcha.png", (err) => { if (err) throw err; })

    }
}
