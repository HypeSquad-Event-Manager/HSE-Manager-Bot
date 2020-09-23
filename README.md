# HSE-Manager-Bot
This bot is made to run on the HSE Manager server.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b513ca3dbae5469bbf4b4767e0f49942)](https://app.codacy.com/gh/HypeSquad-Event-Manager/HSE-Manager-Bot?utm_source=github.com&utm_medium=referral&utm_content=HypeSquad-Event-Manager/HSE-Manager-Bot&utm_campaign=Badge_Grade_Dashboard)
[![DeepScan grade](https://deepscan.io/api/teams/10219/projects/13905/branches/246157/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10219&pid=13905&bid=246157)
[![CodeFactor](https://www.codefactor.io/repository/github/hypesquad-event-manager/hse-manager-bot/badge)](https://www.codefactor.io/repository/github/hypesquad-event-manager/hse-manager-bot)
[![Deploy](https://github.com/HypeSquad-Event-Manager/HSE-Manager-Bot/workflows/Deploy/badge.svg?branch=master)](https://github.com/HypeSquad-Event-Manager/HSE-Manager-Bot/actions?query=workflow%3ADeploy)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHypeSquad-Event-Manager%2FHSE-Manager-Bot.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHypeSquad-Event-Manager%2FHSE-Manager-Bot?ref=badge_shield)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me)


## How to run it ?
1. To run the bot, you need to clone it. Just type:
```shell
$ git clone https://github.com/hypesquad-event-manager/hse-manager-bot
```
2. Then, you'll need to install dependencies. To do that just type:
```shell
$ npm i
or
$ npm install
```
3. Once you installed them, you'll just need to create some files to hold the app credentials. First, you'll need to create a folder at the project root named `private` - it will be automaticaly ignored by git - , once you did that, create a file named `tokens.js` and write the following in it:
```js
module.exports = {
    CLIENTS: {
        HSE_BOT: "Put the bot token here"
    },
    TWITTER: {
        CONSUMER_KEY: "",
        CONSUMER_SECRET: "",
        ACCESS_TOKEN: "",
        ACCESS_TOKEN_SECRET: ""
        // Fill in with your Twitter API Credentials (If not needed for dev purpose, the Twitter functions will not launch and just throw a little error message.)
    }
}
``` 
4. Then you can run the app with the following command:
```shell
$ node index
```

## How to contribute ?
To contribute, you can push your changes to the repository. You can contribute to commands or events triggered by the bot:

### Commands
1. Add a file named `command_name.js` in the `app/commands` folder, then follow this syntax into the file:
```js
// Example import if you need the bot object
const { bot } = require("../app"); 

// Change command for the name of the command, exemple: help, ban, ...
class command {
    constructor() {
        /* Need to be a valid permission from discord.js, 
        it is the permission needed for the user to execute the command.
        Do not define in the constructor if you don't want to set a restriction*/
        this.permission = "MANAGE_MESSAGES" 
        }
        execute(message, args) {
            // Your command execution here
        }
}

// This is mandatory, the exported object must be the command class
module.exports.commands = { command }
```
2. Upload it to Github

Fork This Repository, upload your changed files and open a Pull Request for the develop branch.

If We Like what you did and think it's a good adition, we will merge your PR.

### Events
To register one or more events, create a file inside the `app/events` folder and then name it `event_name.js` then, you can code inside, exemple:
```js
// Import the bot object
const { bot } = require("../app");

// Register an event
bot.on("guildMemberAdd", member => {
    // Your code here
})
```

## Contributors
- [@FoxyWhite2541](https://github.com/FoxyWhite2541): Project Leader
- [@ScarVite](https://github.com/ScarVite): Project Leader
- [@IchiiDev](https://github.com/IchiiDev): Bot Developer
- [@Zallom](https://github.com/Zallom): Bot Developer

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHypeSquad-Event-Manager%2FHSE-Manager-Bot.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHypeSquad-Event-Manager%2FHSE-Manager-Bot?ref=badge_large)
