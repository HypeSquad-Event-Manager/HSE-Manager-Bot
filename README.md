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
*Coming Soon*

## Contributors
- [@IchiiSama](https://github.com/IchiiSama): Bot Developer
- [@FoxyWhite2541](https://github.com/FoxyWhite2541): Project Manager