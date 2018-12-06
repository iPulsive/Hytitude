const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const config = require('./storage/config.json');
const prefix = config.prefix;
const art = require("asciiart-logo");
const chalk = require("chalk");

exports.bot = bot;
bot.commands = new Discord.Collection();

bot.on('error', console.error);

// OnMember Join
bot.on('guildMemberAdd', async member => {

  const welcome = member.guild.channels.find(c => c.name === config.welcome_channel);
  if(!welcome) return console.log(chalk.red(`- [ERROR] Could not find (#${config.welcome_channel}) channel, please create it!`));
  const role = member.guild.roles.find(r => r.name === config.auto_role);
  if(!role) return console.log(chalk.red(`- [ERROR] Could not find (${config.auto_role}) role, please create it!`));

  let embed = new Discord.RichEmbed()
  .setAuthor(`- Welcome ${member.user.username}`, member.guild.iconURL)
  .addField(`🤗 Hello, ${member.user.username}, we appreciate you stopping by and checking out our awesome server Hytitude! We have great plans and we're so excited that you're here to experience Factions getting the love and remake it deserves.`, `\u200b`)
  .addField(`🤔 If you have any questions or concerns feel free to ask a staff member or a chat moderator for assistance! Here at Hytitude we strive to provide the best possible player experience and we intend to do that with our caring and devoted staff.`, `\n\u200b`)
  .addField(`\🌟 IMPORTANT INFORMATION 🌟`, `**IP:** play.hytitude.com\n**Store:** https://store.hytitude.com/\n**Discord:** https://discord.gg/GTc4Cnb`)
  .setColor(config.color);

  welcome.send(embed);
  member.addRole(role);
});

// Bot isEnabled
bot.on('ready', async () => {

  try {

    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log(chalk.blue(
      art({
        name: 'Hytitude',
        font: 'shadow',
        lineChars: 16,
        padding: 5,
        margin: 2
      })
      .emptyLine()
      .emptyLine()
      .center(`Coded by Medi`)
      .emptyLine()
      .render()
    ));

    console.log(chalk.green(`✔ Successfully Enabled`))

    //let link = await bot.generateInvite(["ADMINISTRATOR"]);

    //console.log(link);

    // Command Handler
    const commandFiles = fs.readdirSync("./commands");
    commandFiles.forEach((file) => {
      const command = require(`./commands/${file}`);
      bot.commands.set(command.name, command);
    });

  } catch(e) {

    console.log(chalk.red(`${e.stack}`));
  }
});

// Listener
bot.on("message", async(message) => {

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift();

  if (message.channel.type != "text") return;
  if (message.author.bot) return;

  if (message.author.bot && message.content.startsWith(prefix)) return;
  if (!message.content.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.toLowerCase());
  if (cmd) cmd.execute(message,args);
});
bot.login(config.token);
