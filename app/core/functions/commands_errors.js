const { MessageEmbed } = require("discord.js");

module.exports = {

    noPermission() {
        return new MessageEmbed().setColor("#eb4034").setDescription("Sorry but you do not have the permission to execute this command.\n*Believe this is an error ? Contact the Administrators*");
    }

}