const Discord = require("discord.js");
const config = require("../storage/config.json");

module.exports = {
  name: "announce",
  execute: async (message, args) => {

    if(!message.member.roles.some(r=>["Owner", "Manager"].includes(r.name))) return message.channel.send(new Discord.RichEmbed().setColor("RED").setTitle(`${message.author.username}#${message.author.discriminator}`).setDescription(`**Insufficient Permission**\n\nMissing Role(s) - \`Owner, Manager\``));
    
    let msg = args.slice(0).join(" ");

    if(!msg) return message.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`:x: **Usage:** \`${config.prefix}announce <msg>\``));

    message.delete();

    let embed = new Discord.RichEmbed()
    .setAuthor(`Message by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
    .setDescription(`${msg}`)
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`www.hytitude.com`, message.guild.iconURL);

    message.channel.send(embed);
  }
}
