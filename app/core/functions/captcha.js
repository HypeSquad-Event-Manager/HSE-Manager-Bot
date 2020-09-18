const { MessageAttachment, MessageEmbed } = require("discord.js");
const { CaptchaGenerator } = require('captcha-canvas');
const fs = require("fs");
const CONFIG = require("../../config");
const { checkHypeSquadBadge } = require("./check_badge");
const { time } = require("./time");
const { bot } = require("../../app");

module.exports = {
    async captchaSystem(member) {
        const captcha = new CaptchaGenerator({ heigth: 75, width: 150 });
        const buffer = await captcha.generate();
        let attachment = new MessageAttachment(buffer, "captcha.png");
        if (!fs.existsSync("./temp")) fs.mkdirSync("./temp");
        fs.writeFileSync("./temp/captcha.png", buffer);
        let dm = await member.user.send(new MessageEmbed().setTitle("Captcha Verification").setDescription("Are you a robot ? We're not sure... Can you please verify yourself by completing this captcha ?").setColor("#2F3136").attachFiles("./temp/captcha.png").setImage("attachment://captcha.png").setFooter("Type the captcha below ⬇️ (Must be uppercase)"));
        fs.unlink("./temp/captcha.png", (err) => { if (err) throw err; });
        let errors = 0;
        function awaitCaptcha() {
            const filter = m => m.author.id === member.id;
            dm.channel.awaitMessages(filter, { max: 1 }).then(message => {
                message = message.first()
                if (message.content == captcha.text) {
                    member.roles.add(CONFIG.VERIFIED_ROLE);
                    member.send("Congratulation, you've been verified !");
                    member.guild.channels.cache.get(CONFIG.CAPTCHA_LOG).send(`\`[${time(new Date())}]\` User ${member.user.tag} \`(${member.user.id})\` got the captcha right ! Text: \`${captcha.text}\``);
                    checkHypeSquadBadge(member);
                } else if (errors < 3) {
                    errors++
                    message.channel.send("You're wrong, please enter the right captcha");
                    member.guild.channels.cache.get(CONFIG.CAPTCHA_LOG).send(`\`[${time(new Date())}]\` User ${member.user.tag} \`(${member.user.id})\` got the captcha wrong: \`${captcha.text}\` (${errors}/3)`);
                    if (errors != 3) { awaitCaptcha() }
                    else {
                        message.channel.send(`You got wrong to your 3 attempts, please request another captcha by using the \`hs.verify\` command inside the <#${CONFIG.VERIFICATION_CHANNEL}> channel.`);
                        bot.guilds.cache.get(CONFIG.HSE_MANAGER_GUILD).channels.cache.get(CONFIG.VERIFICATION_CHANNEL).send(`<@${message.author.id}>`, new MessageEmbed().setTitle("Captcha Verification System").setColor("#eb4034").setDescription("You got wrong at 3 captcha attempts. Please type the `hs.verify` command to receive another one"));
                    }
                }
            });
        } awaitCaptcha();
    }
}
