const { bot } = require("../app");
const CONFIG = require("../config");
const { checkHypeSquadBadge } = require("../core/functions/check_badge");

bot.on("guildMemberAdd", member => {
    if (member.guild.id != CONFIG.HSE_MANAGER_GUILD) return;
    checkHypeSquadBadge(member);
});