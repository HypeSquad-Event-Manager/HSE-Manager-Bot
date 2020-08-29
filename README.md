# HSE-Manager-Bot
This bot is made to run on the HSE Manager server. 
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
// Exemple import if you need the bot object
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
2. Commit it to this repository, explain what is the command.
```shell
$ git add .
$ git commit -m "Added help command"
$ git push origin master
```

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
- [@IchiiSama](https://github.com/IchiiSama): Bot Developer
- [@FoxyWhite2541](https://github.com/FoxyWhite2541): Project Manager