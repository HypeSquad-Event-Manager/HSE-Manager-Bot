const { Message } = require("discord.js");
const { bot } = require("../app");
const CONFIG = require("../config");
const { captchaSystem } = require("../core/functions/captcha");
const { checkHypeSquadBadge } = require("../core/functions/check_badge");

bot.on("guildMemberAdd", member => {
    if (member.guild.id != CONFIG.HSE_MANAGER_GUILD || member.user.bot) return;
    checkHypeSquadBadge(member);
});