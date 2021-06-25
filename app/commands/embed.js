const { MessageEmbed } = require("discord.js");
const { bot } = require("../app");
const Config = require("../config");

class msg {
	constructor() {
		this.name = "msg";
		this.permission = "MANAGE_MESSAGES";
	}

	async execute(message, args) {
		if (args[1]) {
			switch (args[1]) {
			case "post":
				if (args[2]) {
					let channelid;
					if (message.mentions.channels.first() && message.guild.channels.cache.get(message.mentions.channels.first().id)) channelid = message.guild.channels.cache.get(message.mentions.channels.first().id).id;
					else if (message.guild.channels.cache.get(args[2])) channelid = args[2];
					else return message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Please specify a correct chanel ID or mention.").setColor("e74c3c").setTimestamp());
					message.channel.send("Let's start an interactive session to create a message with the bot.");
					message.channel.send(new MessageEmbed().setDescription("Do you want to send an embed? ``[y/n/c]``").setColor("8b9be1").setTimestamp());
					const filter = m => m.author.id === message.author.id;
					const Embed = new MessageEmbed();
					function Send(classicmessage = null) {
						message.channel.send(new MessageEmbed().setTitle("Step 12 | Send").setDescription("Do you want to send the message? ``[y/n/c/r]``").setColor("8b9be1").setTimestamp());
						if (classicmessage === null) message.channel.send(Embed);
						else message.channel.send(classicmessage, Embed);
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								if (classicmessage === null) message.guild.channels.cache.get(channelid).send(Embed).then(send_msg => message.channel.send(new MessageEmbed().setTitle("Message sent !").setDescription(`Go to message **[here](https://discord.com/channels/${message.guild.id}/${channelid}/${send_msg.id}/ "Go to message")**`).setColor("8b9be1").setTimestamp()));
								else message.guild.channels.cache.get(channelid).send(classicmessage, Embed).then(send_msg => message.channel.send(new MessageEmbed().setTitle("Message sent !").setDescription(`Go to message **[here](https://discord.com/channels/${message.guild.id}/${channelid}/${send_msg.id}/ "Go to message")**`).setColor("8b9be1").setTimestamp()));
							} else if (collected.first().content === "r" || collected.first().content === "return") MessageSend();
							else message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
						});
					}
					function MessageSend() {
						message.channel.send(new MessageEmbed().setTitle("Step 11 | Message").setDescription("Do you want to put an additional message at the top of your embed? ``[y/n/c/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 11 | Message").setDescription("What additional message do you want to put at the top of your embed?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 2048) Send(collected.first().content);
										else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Timestamp();
							else Send();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Timestamp() {
						message.channel.send(new MessageEmbed().setTitle("Step 10 | Timestamp").setDescription("Do you want to put the timestamp on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								Embed.setTimestamp();
								MessageSend();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Attachement();
							else MessageSend();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Attachement() {
						message.channel.send(new MessageEmbed().setTitle("Step 9 | Attachement").setDescription("Do you want to attach an image or a file to your Embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 9 | File").setDescription("What file or image do you want to attach to your embed?\n**(Enter a valid URL or File)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
											Embed.attachFiles(collected.first().content);
											Timestamp();
										} else if (collected.first().attachments.size > 0) {
											Embed.attachFiles(new MessageAttachment(collected.first().attachments.first().url));
											Timestamp();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or File.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Color();
							else Timestamp();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Color() {
						message.channel.send(new MessageEmbed().setTitle("Step 8 | Color").setDescription("Do you want to put a color on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 8 | Color").setDescription("What color do you want to put on your embed?\n**(Give a hexadecimal color)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length === 6) {
											Embed.setColor(collected.first().content);
											Attachement();
										} else if (collected.first().content.startsWith("#") && collected.first().content.length === 7) {
											Embed.setColor(collected.first().content.replace("#", ""));
											Attachement();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid color.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Footer();
							else Attachement();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Footer() {
						message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer").setDescription("Do you want to put a footer on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer").setDescription("Which footer do you want to put on your embed?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 2048) {
											Embed.setFooter(collected.first().content);
											FooterImage(collected.first().content);
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Image();
							else Color();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function FooterImage(footer) {
							message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer Image").setDescription("Do you want to put an image on the footer of your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer").setDescription("What image do you want to put on the footer of your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												Embed.setFooter(footer, collected.first().content);
												Color();
											} else if (collected.first().attachments.size > 0) {
												Embed.setFooter(footer, collected.first().attachments.first().url);
												Color();
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") Footer();
								else Color();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Image() {
						message.channel.send(new MessageEmbed().setTitle("Step 6 | Image").setDescription("Do you want to put an image to your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 6 | Image").setDescription("What image do you want to put on your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
											Embed.setImage(collected.first().content);
											Footer();
										} else if (collected.first().attachments.size > 0) {
											Embed.setImage(collected.first().attachments.first().url);
											Footer();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Thumbnail();
							else Footer();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Thumbnail() {
						message.channel.send(new MessageEmbed().setTitle("Step 5 | Thumbnail").setDescription("Do you want to put a thumbnail on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 5 | Thumbnail").setDescription("Which thumbnail do you want to put on your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
											Embed.setThumbnail(collected.first().content);
											Image();
										} else if (collected.first().attachments.size > 0) {
											Embed.setThumbnail(collected.first().attachments.first().url);
											Image();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Filed();
							else Image();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Filed() {
						message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("Do you want to add a field to your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("What title do you want to put in your field?\n**(Must not exceed 256 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 256) FieldDescription(collected.first().content);
										else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Description();
							else Thumbnail();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function FieldDescription(title) {
							message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("What description do you want to put on your field?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content.length <= 2048) FieldReturnToLine(title, collected.first().content);
								else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => FieldDescription(title));
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
						function FieldReturnToLine(title, description) {
							message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("Do you want the field to wrap? ``[y/n]``").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									Embed.addField(title, description, false);
									Filed();
								} else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") FieldDescription(title);
                                else {
                                    Embed.addField(title, description, true);
                                    Filed();
                                }
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Description() {
						message.channel.send(new MessageEmbed().setTitle("Step 3 | Description").setDescription("Do you want to add a description to your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 3 | Description").setDescription("What description do you want to put on your embed?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 2048) {
											Embed.setDescription(collected.first().content);
											Filed();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Title();
							else Filed();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Title() {
						message.channel.send(new MessageEmbed().setTitle("Step 2 | Title").setDescription("Do you want to put a title on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 2 | Title").setDescription("What title do you want to put on your embed?\n**(Must not exceed 256 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 256) {
											Embed.setTitle(collected.first().content);
											TitleURL();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Author();
							else Description();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function TitleURL() {
							message.channel.send(new MessageEmbed().setTitle("Step 2:1 | Title URL").setDescription("Do you want to put a URL on the title of your embed? ``[y/n/c/p/r]``**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 2:1 | Title URL").setDescription("What URL do you want to put on the title of your embed?\n**(Enter a valid url)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												if (collected.first().content.includes(".")) {
													Embed.setURL(collected.first().content);
													Description();
												} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid url.").setColor("e74c3c").setTimestamp()).then(() => d_1());
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid url.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") Title();
								else Description();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Author() {
						message.channel.send(new MessageEmbed().setTitle("Step 1 | Author").setDescription("Do you want to add an author to your embed? ``[y/n/c/p]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								message.channel.send(new MessageEmbed().setTitle("Step 1 | Author").setDescription("What type of author do you want to put on your embed?").addField("Types", "<:MarkNumber_1:640140626402476064> Guild\n<:MarkNumber_2:640140626750341120> Actual author\n<:MarkNumber_3:640140626804867092> Other User\n<:MarkNumber_4:640140626968576010> Specific", true).setColor("8b9be1").setTimestamp());
								message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
									if (collected.first().content === "1" || collected.first().content === "Server" || collected.first().content === "server" || collected.first().content === "Guild" || collected.first().content === "guild" || collected.first().content === "serveur" || collected.first().content === "Serveur") {
										Embed.setAuthor(message.guild.name, message.guild.iconURL());
										Title();
									} else if (collected.first().content === "2" || collected.first().content === "Me" || collected.first().content === "me" || collected.first().content === "Moi" || collected.first().content === "moi" || collected.first().content === "auteur" || collected.first().content === "Auteur" || collected.first().content === "Author" || collected.first().content === "author") {
										Embed.setAuthor(message.author.tag, message.author.avatarURL());
										Title();
									} else if (collected.first().content === "3" || collected.first().content === "Other" || collected.first().content === "other" || collected.first().content === "User" || collected.first().content === "user" || collected.first().content === "Autre" || collected.first().content === "autre" || collected.first().content === "utilisateur" || collected.first().content === "Utilisateur") {
										function d_1() {
											message.channel.send(new MessageEmbed().setTitle("Step 1 | Author").setDescription("Which user do you want to put author on your embed?\n**(Please specify a valid user id)**").setColor("8b9be1").setTimestamp());
											message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
												if (message.guild.members.cache.get(collected.first().content)) {
													Embed.setAuthor(message.guild.members.cache.get(collected.first().content).tag, message.guild.members.cache.get(collected.first().content).avatarURL);
													Title();
												} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid user.").setColor("e74c3c").setTimestamp()).then(() => d_1());
											}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
										}
										d_1();
									} else Specific();
								}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else Title();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function Specific() {
							message.channel.send(new MessageEmbed().setTitle("Step 1 | Author (Specific)").setDescription("Quel auteur voulez-vous mettre à votre embed ?\n**(Must not exceed 256 characters)**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content.length <= 256) {
									Embed.setAuthor(collected.first().content);
									AuthorImage(collected.first().content);
								} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => Specific());
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
						function AuthorImage(author) {
							message.channel.send(new MessageEmbed().setTitle("Step 1:1 | Author Image (Specific)").setDescription("Do you want to put an image on the author of your embed? ``[y/n/c/p/r]``**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 1:1 | Author Image (Specific)").setDescription("What image do you want to put on the author of your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												Embed.setAuthor(author, collected.first().content);
												AuthorURL(author, collected.first().content);
											} else if (collected.first().attachments.size > 0) {
												Embed.setAuthor(author, collected.first().attachments.first().url);
												AuthorURL(author, collected.first().content);
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") Specific();
								else Title();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
						function AuthorURL(author, image) {
							message.channel.send(new MessageEmbed().setTitle("Step 1:2 | Author URL").setDescription("Do you want to put a URL on the author of your embed? ``[y/n/c/p/r]``**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 1:2 | Author URL").setDescription("What URL do you want to put on the author of your embed?\n**(Enter a valid url)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												Embed.setAuthor(author, image, collected.first().content);
												Title();
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid url.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") AuthorImage(author);
								else Title();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Pass(wherepass = null) {
						if (wherepass === null) Send();
						else if (wherepass === "1" || wherepass === "author" || wherepass === "Author" || wherepass === "Auteur") Author();
						else if (wherepass === "2" || wherepass === "title" || wherepass === "Title") Title();
						else if (wherepass === "3" || wherepass === "description" || wherepass === "Description") Description();
						else if (wherepass === "4" || wherepass === "field" || wherepass === "Field") Filed();
						else if (wherepass === "5" || wherepass === "thumbnail" || wherepass === "Thumbnail") Thumbnail();
						else if (wherepass === "6" || wherepass === "image" || wherepass === "Image") Image();
						else if (wherepass === "7" || wherepass === "footer" || wherepass === "Footer") Footer();
						else if (wherepass === "8" || wherepass === "color" || wherepass === "Color") Color();
						else if (wherepass === "9" || wherepass === "File" || wherepass === "file" || wherepass === "Files" || wherepass === "files" || wherepass === "Attachement" || wherepass === "Attachements" || wherepass === "attachement" || wherepass === "attachements") Attachement();
						else if (wherepass === "10" || wherepass === "timestamp" || wherepass === "Timestamp") Timestamp();
						else if (wherepass === "11" || wherepass === "message" || wherepass === "Message") MessageSend();
						else Send();
					}
					message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
						if (collected.first().content === "y") {
							function d_2() {
								message.channel.send(new MessageEmbed().setDescription(`Are you sure you want to send the message configured later in the channel <#${channelid}> \`\`[y/n/c]\`\``).setColor("8b9be1").setTimestamp());
								message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
									if (collected.first().content === "y" || collected.first().content === "yes") Author();
									else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
									else {
										function d_1() {
											message.channel.send(new MessageEmbed().setDescription("Please tell me which channel to send the embed to.").setColor("8b9be1").setTimestamp());
											message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
												if (collected.first().mentions.channels.first() && message.guild.channels.cache.get(collected.first().mentions.channels.first().id)) {
													channelid = message.guild.channels.cache.get(collected.first().mentions.channels.first().id).id;
													d_2();
												} else if (message.guild.channels.cache.get(collected.first().content)) {
													channelid = collected.first().content;
													d_2();
												} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this channel is not valid..").setColor("e74c3c").setTimestamp()).then(() => d_1());
											}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
										}
										d_1();
									}
								}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
							}
							d_2();
						} else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
						else {
							function d_2() {
								message.channel.send(new MessageEmbed().setDescription(`Are you sure you want to send the message configured later in the channel <#${channelid}> \`\`[y/n/c]\`\``).setColor("8b9be1").setTimestamp());
								message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
									if (collected.first().content === "y" || collected.first().content === "yes") {
										message.channel.send(new MessageEmbed().setDescription("What message do you want to send?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.length <= 2048) {
												const message_content_ = collected.first().content;
												message.channel.send(new MessageEmbed().setDescription("Do you want to send the message? ``[y/n/c]``").setColor("8b9be1").setTimestamp());
												message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
													if (collected.first().content === "y" || collected.first().content === "yes") message.guild.channels.cache.get(channelid).send(message_content_).then(send_msg => message.channel.send(new MessageEmbed().setTitle("Message sent !").setDescription(`Go to message **[here](https://discord.com/channels/${message.guild.id}/${channelid}/${send_msg.id}/ "Go to message")**`).setColor("8b9be1").setTimestamp()));
													else message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
												});
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									} else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
									else {
										function d_1() {
											message.channel.send(new MessageEmbed().setDescription("Please tell me which channel to send the embed to. ").setColor("8b9be1").setTimestamp());
											message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
												if (collected.first().mentions.channels.first() && message.guild.channels.cache.get(collected.first().mentions.channels.first().id)) {
													channelid = message.guild.channels.cache.get(collected.first().mentions.channels.first().id).id;
													d_2();
												} else if (message.guild.channels.cache.get(collected.first().content)) {
													channelid = collected.first().content;
													d_2();
												} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this channel is not valid..").setColor("e74c3c").setTimestamp()).then(() => d_1());
											}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
										}
										d_1();
									}
								}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
							}
							d_2();
						}
					}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()).then(() => console.log("oula")));
				} else message.channel.send(new MessageEmbed().setTitle(`Help : ${Config.PREFIX}msg post`).setDescription(`Command to post a totally personalized message with the bot <@${bot.user.id}>.`).addField("**Infomations :**", `**> Permission :** *${this.permission}*\n**> Argument(s)** **1:** *ID or mention of chanel.*`).addField("**Example :**", `\`${Config.PREFIX}msg post 581223459896426496\``).setColor("8b9be1").setTimestamp());
				break;

			case "edit":
				if (args[2]) {
					let inter;
					if (args[2].startsWith(`https://canary.discord.com/channels/${message.guild.id}/`)) inter = args[2].replace(`https://canary.discord.com/channels/${message.guild.id}/`, "");
					else if (args[2].startsWith(`https://ptb.discord.com/channels/${message.guild.id}/`)) inter = args[2].replace(`https://ptb.discord.com/channels/${message.guild.id}/`, "");
					else if (args[2].startsWith(`https://discord.com/channels/${message.guild.id}/`)) inter = args[2].replace(`https://discord.com/channels/${message.guild.id}/`, "");
					else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Please give me a valid link.").setColor("e74c3c").setTimestamp());
					let channelid = inter.split("/")[0];
					let messageid = inter.split("/")[1];
					message.guild.channels.cache.get(channelid).messages.fetch({ around: messageid, limit: 1 }).then(messages => { if (messages.first().editable !== true) return message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("This is not one of my messages.").setColor("e74c3c").setTimestamp()); });
					message.channel.send("Let's start an interactive message editing session.");
					const filter = m => m.author.id === message.author.id;
					const Embed = new MessageEmbed();
					function Send(classicmessage = null) {
						message.channel.send(new MessageEmbed().setTitle("Step 12 | Edit").setDescription("Do you want to edit the message? ``[y/n/c]``").setColor("8b9be1").setTimestamp());
						if (classicmessage !== null) message.channel.send(classicmessage, Embed);
						else message.channel.send(Embed);
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") message.guild.channels.cache.get(channelid).messages.fetch({ around: messageid, limit: 1 }).then(messages => {
								if (classicmessage !== null) messages.first().edit(classicmessage, Embed).then(editmsg => message.channel.send(new MessageEmbed().setTitle("Message edited!").setDescription(`Go to message **[here](${editmsg.url} "Go to message")**`).setColor("8b9be1").setTimestamp()));
								else messages.first().edit("", Embed).then(editmsg => message.channel.send(new MessageEmbed().setTitle("Message edited!").setDescription(`Go to message **[here](${editmsg.url} "Go to message")**`).setColor("8b9be1").setTimestamp()));
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("This message does not exist.").setColor("e74c3c").setTimestamp()));
							else message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
						});
					}
					function MessageSend() {
						message.channel.send(new MessageEmbed().setTitle("Step 11 | Message").setDescription("Do you want to put an additional message at the top of your embed? ``[y/n/c/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 11 | Message").setDescription("What additional message do you want to put at the top of your embed?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 2048) Send(collected.first().content);
										else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Timestamp();
							else Send();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Timestamp() {
						message.channel.send(new MessageEmbed().setTitle("Step 10 | Timestamp").setDescription("Do you want to put the timestamp on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								Embed.setTimestamp();
								MessageSend();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Attachement();
							else MessageSend();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Attachement() {
						message.channel.send(new MessageEmbed().setTitle("Step 9 | Attachement").setDescription("Do you want to attach an image or a file to your Embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 9 | File").setDescription("What file or image do you want to attach to your embed?\n**(Enter a valid URL or File)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
											Embed.attachFiles(collected.first().content);
											Timestamp();
										} else if (collected.first().attachments.size > 0) {
											const attachement = new MessageAttachment(collected.first().attachments.first().url);
											Embed.attachFiles(attachement);
											Timestamp();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or File.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Color();
							else Timestamp();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Color() {
						message.channel.send(new MessageEmbed().setTitle("Step 8 | Color").setDescription("Do you want to put a color on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 8 | Color").setDescription("Quelle couleur voulez-vous mettre à votre embed ?\n**(Give a hexadecimal color)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length === 6) {
											Embed.setColor(collected.first().content);
											Timestamp();
										} else if (collected.first().content.startsWith("#") && collected.first().content.length === 7) {
											Embed.setColor(collected.first().content.replace("#", ""));
											Timestamp();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid color.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Footer();
							else Attachement();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Footer() {
						message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer").setDescription("Do you want to put a footer on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer").setDescription("Which footer do you want to put on your embed?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 2048) {
											Embed.setFooter(collected.first().content);
											FooterImage(collected.first().content);
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Image();
							else Color();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function FooterImage(footer) {
							message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer Image").setDescription("Do you want to put an image on the footer of your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 7 | Footer").setDescription("What image do you want to put on the footer of your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												Embed.setFooter(footer, collected.first().content);
												Color();
											} else if (collected.first().attachments.size > 0) {
												Embed.setFooter(footer, collected.first().attachments.first().url);
												Color();
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") Footer();
								else Color();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Image() {
						message.channel.send(new MessageEmbed().setTitle("Step 6 | Image").setDescription("Do you want to put an image to your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 6 | Image").setDescription("What image do you want to put on your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
											Embed.setImage(collected.first().content);
											Footer();
										} else if (collected.first().attachments.size > 0) {
											Embed.setImage(collected.first().attachments.first().url);
											Footer();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Thumbnail();
							else Footer();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Thumbnail() {
						message.channel.send(new MessageEmbed().setTitle("Step 5 | Thumbnail").setDescription("Voulez-vous mettre un thumbnail à votre embed ? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 5 | Thumbnail").setDescription("Which thumbnail do you want to put on your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
											Embed.setThumbnail(collected.first().content);
											Image();
										} else if (collected.first().attachments.size > 0) {
											Embed.setThumbnail(collected.first().attachments.first().url);
											Image();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Filed();
							else Image();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Filed() {
						message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("Do you want to add a field to your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("What title do you want to put in your field?\n**(Must not exceed 256 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 256) FieldDescription(collected.first().content);
										else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Description();
							else Thumbnail();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function FieldDescription(title) {
							message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("What description do you want to put on your field?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content.length <= 2048) FieldReturnToLine(title, collected.first().content);
								else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => FieldDescription(title));
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
						function FieldReturnToLine(title, description) {
							message.channel.send(new MessageEmbed().setTitle("Step 4 | Field").setDescription("Do you want the field to wrap? ``[y/n]``").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									Embed.addField(title, description, false);
									Filed();
								} else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") FieldDescription(title);
								else {
                                    Embed.addField(title, description, true);
                                    Filed();
                                }
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Description() {
						message.channel.send(new MessageEmbed().setTitle("Step 3 | Description").setDescription("Do you want to add a description to your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 3 | Description").setDescription("What description do you want to put on your embed?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 2048) {
											Embed.setDescription(collected.first().content);
											Filed();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Title();
							else Filed();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Title() {
						message.channel.send(new MessageEmbed().setTitle("Step 2 | Title").setDescription("Do you want to put a title on your embed? ``[y/n/c/p/r]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								function d_1() {
									message.channel.send(new MessageEmbed().setTitle("Step 2 | Title").setDescription("What title do you want to put on your embed?\n**(Must not exceed 256 characters)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().content.length <= 256) {
											Embed.setTitle(collected.first().content);
											TitleURL();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => d_1());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_1();
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else if (collected.first().content === "r" || collected.first().content === "return") Author();
							else Description();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function TitleURL() {
							message.channel.send(new MessageEmbed().setTitle("Step 2:1 | Title URL").setDescription("Do you want to put a URL on the title of your embed? ``[y/n/c/p/r]``**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 2:1 | Title URL").setDescription("What URL do you want to put on the title of your embed?\n**(Enter a valid url)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												if (collected.first().content.includes(".")) {
													Embed.setURL(collected.first().content);
													Description();
												} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid url.").setColor("e74c3c").setTimestamp()).then(() => d_1());
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid url.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") Title();
								else Description();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Author() {
						message.channel.send(new MessageEmbed().setTitle("Step 1 | Author").setDescription("Do you want to add an author to your embed? ``[y/n/c/p]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") {
								message.channel.send(new MessageEmbed().setTitle("Step 1 | Author").setDescription("What type of author do you want to put on your embed?").addField("Types", "<:MarkNumber_1:640140626402476064> Guild\n<:MarkNumber_2:640140626750341120> Actual author\n<:MarkNumber_3:640140626804867092> Other User\n<:MarkNumber_4:640140626968576010> Specific", true).setColor("8b9be1").setTimestamp());
								message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
									if (collected.first().content === "1" || collected.first().content === "Server" || collected.first().content === "server" || collected.first().content === "Guild" || collected.first().content === "guild" || collected.first().content === "serveur" || collected.first().content === "Serveur") {
										Embed.setAuthor(message.guild.name, message.guild.iconURL());
										Title();
									} else if (collected.first().content === "2" || collected.first().content === "Me" || collected.first().content === "me" || collected.first().content === "Moi" || collected.first().content === "moi" || collected.first().content === "auteur" || collected.first().content === "Auteur" || collected.first().content === "Author" || collected.first().content === "author") {
										Embed.setAuthor(message.author.tag, message.author.avatarURL());
										Title();
									} else if (collected.first().content === "3" || collected.first().content === "Other" || collected.first().content === "other" || collected.first().content === "User" || collected.first().content === "user" || collected.first().content === "Autre" || collected.first().content === "autre" || collected.first().content === "utilisateur" || collected.first().content === "Utilisateur") {
										function d_1() {
											message.channel.send(new MessageEmbed().setTitle("Step 1 | Author").setDescription("Which user do you want to put author on your embed?\n**(Please specify a valid user id)**").setColor("8b9be1").setTimestamp());
											message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
												if (message.guild.members.cache.get(collected.first().content)) {
													Embed.setAuthor(message.guild.members.cache.get(collected.first().content).tag, message.guild.members.cache.get(collected.first().content).avatarURL);
													Title();
												} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid user.").setColor("e74c3c").setTimestamp()).then(() => d_1());
											}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
										}
										d_1();
									} else Specific();
								}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
							} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
							else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else Title();
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						function Specific() {
							message.channel.send(new MessageEmbed().setTitle("Step 1 | Author (Specific)").setDescription("Quel auteur voulez-vous mettre à votre embed ?\n**(Must not exceed 256 characters)**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content.length <= 256) {
									Embed.setAuthor(collected.first().content);
									AuthorImage(collected.first().content);
								} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp()).then(() => Specific());
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
						function AuthorImage(author) {
							message.channel.send(new MessageEmbed().setTitle("Step 1:1 | Author Image (Specific)").setDescription("Do you want to put an image on the author of your embed? ``[y/n/c/p/r]``**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 1:1 | Author Image (Specific)").setDescription("What image do you want to put on the author of your embed?\n**(Enter a valid URL or Image)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												Embed.setAuthor(author, collected.first().content);
												AuthorURL(author, collected.first().content);
											} else if (collected.first().attachments.size > 0) {
												Embed.setAuthor(author, collected.first().attachments.first().url);
												AuthorURL(author, collected.first().content);
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid URL or Image.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") Specific();
								else Title();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
						function AuthorURL(author, image) {
							message.channel.send(new MessageEmbed().setTitle("Step 1:2 | Author URL").setDescription("Do you want to put a URL on the author of your embed? ``[y/n/c/p/r]``**").setColor("8b9be1").setTimestamp());
							message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
								if (collected.first().content === "y" || collected.first().content === "yes") {
									function d_1() {
										message.channel.send(new MessageEmbed().setTitle("Step 1:2 | Author URL").setDescription("What URL do you want to put on the author of your embed?\n**(Enter a valid url)**").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content.match(/^https?:\/\/.+\./) || collected.first().content.match(/^http?:\/\/.+\./)) {
												Embed.setAuthor(author, image, collected.first().content);
												Title();
											} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this is not a valid url.").setColor("e74c3c").setTimestamp()).then(() => d_1());
										}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
									}
									d_1();
								} else if (collected.first().content === "p" || collected.first().content === "pass") Pass();
								else if (collected.first().content.startsWith("p=") || collected.first().content.startsWith("pass=")) Pass(collected.first().content.split("=")[1]);
								else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
								else if (collected.first().content === "r" || collected.first().content === "return") AuthorImage(author);
								else Title();
							}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
						}
					}
					function Go() {
						message.channel.send(new MessageEmbed().setDescription("Do you want to edit it in embed? ``[y/n/c]``").setColor("8b9be1").setTimestamp());
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y") {
								Author();
							} else {
								message.channel.send(new MessageEmbed().setDescription("What message do you want to put?\n**(Must not exceed 2048 characters)**").setColor("8b9be1").setTimestamp());
								message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
									if (collected.first().content.length <= 2048) {
										const message_content_ = collected.first().content;
										message.channel.send(new MessageEmbed().setDescription("Do you want to edit the message? ``[y/n]``").setColor("8b9be1").setTimestamp());
										message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
											if (collected.first().content === "y" || collected.first().content === "yes") message.guild.channels.cache.get(channelid).messages.fetch({ around: messageid, limit: 1 }).then(messages => messages.first().edit(message_content_).then(() => message.channel.send(new MessageEmbed().setTitle("Message edited!").setDescription(`Go to message **[here](https://discord.com/channels/${message.guild.id}/${channelid}/${messageid}/ "Go to message")**`).setColor("8b9be1").setTimestamp())).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("This message does not exist!").setColor("e74c3c").setTimestamp())));
											else message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
										});
									} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Sorry but this message is too long.").setColor("e74c3c").setTimestamp());
								}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
							}
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					function Pass(wherepass = null) {
						if (wherepass === null) Send();
						else if (wherepass === "1" || wherepass === "author" || wherepass === "Author") Author();
						else if (wherepass === "2" || wherepass === "title" || wherepass === "Title") Title();
						else if (wherepass === "3" || wherepass === "description" || wherepass === "Description") Description();
						else if (wherepass === "4" || wherepass === "field" || wherepass === "Field") Filed();
						else if (wherepass === "5" || wherepass === "thumbnail" || wherepass === "Thumbnail") Thumbnail();
						else if (wherepass === "6" || wherepass === "image" || wherepass === "Image") Image();
						else if (wherepass === "7" || wherepass === "footer" || wherepass === "Footer") Footer();
						else if (wherepass === "8" || wherepass === "color" || wherepass === "Color") Color();
						else if (wherepass === "9" || wherepass === "File" || wherepass === "file" || wherepass === "Files" || wherepass === "files" || wherepass === "Attachement" || wherepass === "Attachements" || wherepass === "attachement" || wherepass === "attachements") Attachement();
						else if (wherepass === "10" || wherepass === "timestamp" || wherepass === "Timestamp") Timestamp();
						else if (wherepass === "11" || wherepass === "message" || wherepass === "Message") MessageSend();
						else if (wherepass === "12" || wherepass === "send" || wherepass === "Send") Send();
						else Send();
					}
					function d_21() {
						message.channel.send(new MessageEmbed().setDescription("Are you sure you want to edit the post below? ``[y/n/c]``").setColor("8b9be1").setTimestamp());
						message.guild.channels.cache.get(channelid).messages.fetch({ around: messageid, limit: 1 }).then(messages => {
							if (messages.first().embeds) {
								messages.first().embeds.map(embed => {
									if (messages.first().content) message.channel.send(messages.first().content, embed);
									else message.channel.send(embed);
								});
							} else message.channel.send(messages.first().content);
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("This message does not exist.").setColor("e74c3c").setTimestamp()));
						message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
							if (collected.first().content === "y" || collected.first().content === "yes") Go();
							else if (collected.first().content === "c" || collected.first().content === "cancel") message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You just canceled sending the message.").setColor("e74c3c").setTimestamp());
							else {
								function d_12() {
									message.channel.send(new MessageEmbed().setDescription("Which message do you want to edit?\n**(Send a link to this message)**").setColor("8b9be1").setTimestamp());
									message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
										if (collected.first().startsWith(`https://canary.discord.com/channels/${message.guild.id}/`)) {
											inter = args[2].replace(`https://canary.discord.com/channels/${message.guild.id}/`, "");
											channelid = inter.split("/")[0]; messageid = inter.split("/")[1];
											d_21();
										} else if (collected.first().startsWith(`https://ptb.discord.com/channels/${message.guild.id}/`)) {
											inter = args[2].replace(`https://ptb.discord.com/channels/${message.guild.id}/`, "");
											channelid = inter.split("/")[0]; messageid = inter.split("/")[1];
											d_21();
										} else if (collected.first().startsWith(`https://discord.com/channels/${message.guild.id}/`)) {
											inter = args[2].replace(`https://discord.com/channels/${message.guild.id}/`, "");
											channelid = inter.split("/")[0]; messageid = inter.split("/")[1];
											d_21();
										} else message.channel.send(new MessageEmbed().setTitle("Error !").setDescription("Please give me a valid link.").setColor("e74c3c").setTimestamp()).then(() => d_12());
									}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
								}
								d_12();
							}
						}).catch(() => message.channel.send(new MessageEmbed().setTitle("Canceled !").setDescription("You took too long to respond!").setColor("e74c3c").setTimestamp()));
					}
					d_21();
				} else message.channel.send(new MessageEmbed().setTitle(`Help : ${Config.PREFIX}msg edit`).setDescription(`Command to edit a message already posted by the bot <@${bot.user.id}>.`).addField("**Infomations :**", `**> Permission :** ${this.permission}\n**> Argument(s)** **1:** *Message link present on your server.*`).addField("**Example :**", `\`${Config.PREFIX}msg edit https://discord.com/channels/264363165855252480/286202340782899210/640698942396432405\``).setColor("8b9be1").setTimestamp());
				break;
			}
		} else message.channel.send(new MessageEmbed().setTitle(`Help : ${Config.PREFIX}msg`).setDescription("Message command").addField("**Infomations :**", `**> Permission :** ${this.permission}\n**> Argument(s)** **1:** *Sub-command <post | edit>.*\n **2** *Sub-command argument.*`).addField("**Example :**", `\`${Config.PREFIX}msg post 581223459896426496\`\n\`${Config.PREFIX}msg edit https://discord.com/channels/264363165855252480/286202340782899210/640698942396432405\``).setColor("8b9be1").setTimestamp());
	}
}
module.exports.commands = { msg };
