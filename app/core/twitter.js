let Twit = require('twit');
const CONFIG = require('../config');
const TOKENS = require("../../private/tokens");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../app");

async function Twitter() {
    console.log("Connecting to Twitter...");

    let api = new Twit({
        consumer_key: TOKENS.TWITTER.CONSUMER_KEY,
        consumer_secret: TOKENS.TWITTER.CONSUMER_SECRET,
        access_token: TOKENS.TWITTER.ACCESS_TOKEN,
        access_token_secret: TOKENS.TWITTER.ACCESS_TOKEN_SECRET
    });

    let connected;
    await api.get('account/verify_credentials', { skip_status: true }).catch(function () {
        console.log("\x1b[31mError:\x1b[0m Cannot connect to Twitter, Tweets functions disabled.");
        connected = false;
    }).then(result => {
        if (connected != undefined && connected == false) return;
        console.log(`Twitter: Connected to account \x1b[33m@${result.data.screen_name}\x1b[0m`);
        connected = true;
    });
    if (!connected) return;

    let stream = api.stream("statuses/filter", { follow: CONFIG.TWITTER_ACCOUNT_ID });

    stream.on('tweet', function (tweet) {
        if (CONFIG.TWITTER_ACCOUNT_ID == tweet.user.id_str) {
            if (tweet.in_reply_to_status_id) return;
            if (tweet.text.split(" ")[tweet.text.split(" ").length - 1].match(/https:\/\/t.co\/([^\s]+)/g) != null) {
                bot.guilds.cache.get(CONFIG.HSE_MANAGER_GUILD).channels.cache.get(CONFIG.TWITTER_CHANNEL_ID).send(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
            } else {
                let TweetEmbed = new MessageEmbed().setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`, tweet.user.profile_image_url).setDescription(tweet.text + `\n\n[Tweet Link](https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str})`).setFooter("Twitter", "https://images-ext-1.discordapp.net/external/bXJWV2Y_F3XSra_kEqIYXAAsI3m1meckfLhYuWzxIfI/https/abs.twimg.com/icons/apple-touch-icon-192x192.png").setColor("#38A1F3");
                bot.guilds.cache.get(CONFIG.HSE_MANAGER_GUILD).channels.cache.get(CONFIG.TWITTER_CHANNEL_ID).send(TweetEmbed);
            }
        }
    });


}

module.exports = { Twitter };
