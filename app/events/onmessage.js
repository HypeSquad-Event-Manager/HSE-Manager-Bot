const { bot } = require("../app");

bot.on("message", async (message) => {
    if (message.author.bot === true) return;
    // Checks if the member is either Staff or HSE member.
    if (message.member.roles.cache.has("754440208988110914") || message.member.roles.cache.has("684489384590180489")) return;

    // Searches for the word "BADGE" and sends the disclaimer message.
    if (message.content.toUpperCase().includes("BADGE")) {
        try {
            await message.react("⚠");
            await message.channel.send("Quick reminder, that we are not a support server for the HypeSquad Events program or any other Discord community program. The team won't answer any questions regarding how to enter the program, when will it be open, what are the requirements, etc. Some of your questions may have already been answered here in the pinned messages or in <#843580272216637461>")
        } catch (e) {
            console.log(e);
        }
    }

});