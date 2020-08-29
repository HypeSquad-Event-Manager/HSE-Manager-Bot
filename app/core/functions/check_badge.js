const { UserFlags } = require("discord.js");
const { bot } = require("../../app");
const CONFIG = require("../../config");

module.exports = {
    checkHypeSquadBadge(member) {
        return new Promise((resolve, reject) => {
            member.user.fetchFlags().then(flags => {
                let userflags = new UserFlags(flags.bitfield);
                if (userflags.has("HYPESQUAD_EVENTS")) {
                    member.roles.add(bot.guilds.cache.get(CONFIG.HSE_MANAGER_GUILD).roles.cache.get(CONFIG.HSE_ROLE));
                    resolve(true);
                } else resolve(false);
            });
        });
    }
}