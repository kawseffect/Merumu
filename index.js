require('http').createServer((req, res) => res.end()).listen(4000)


// ================= START BOT CODE ===================

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const active = 'On | <:MeruYes:952435870491893810> ';
const on = 'Activated | <:MeruYes:952435870491893810> ';
const config = require("./config.json")
const botpinggu = `${Math.floor(Math.random() * 65) + 15}`;
const Database = require("./db");
const database = new Database();
const moment = require('moment');
require("moment-duration-format");
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
const backup = require("discord-backup")
const canvacord = require('canvacord')
const DisTube = require('distube')
const distube = new DisTube(client, { searchSongs: true }, { leaveOnEmpty: true }, { emitNewSongOnly: true });
const gm = require('gm').subClass({ imageMagick: true });
const request = require('node-superfetch');
const { Swiftcord } = require("swiftcord");
const cord = new Swiftcord();
const { tictactoe, timeout } = require('reconlx')
const HangmanGame = require('hangcord');
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();
const superagent = require('superagent');
const commands = '81';
const { ReactionCollector } = require('discord.js-collector');
const urban = require("urban");
const fetch = require('node-fetch');
const snekfetch = require('snekfetch')
const cherrio = require('cheerio');
 
    const ud = require("relevant-urban");
const { stripIndents } = require('common-tags');

    const axios = require('axios');

const tokem = process.env['token']

const data = {
  key: 'AIzaSyAGq4IZmPF_o4hzWLKrc0yhXgeDTFeFEpc'
}


const { version } = require('./package.json');
const { GOOGLE_KEY } = data.key;

var economy = new db.table('economy')

client.setMaxListeners(99999999999999999999999999999);

const Genius = require("genius-lyrics");
const Client = new Genius.Client(config.api);

client.on('rateLimit', (info) => console.warn(`[API] Rate limit hit, ${info.timeout}ms delay!`));


let d = moment().format('lll');

const permbl = []
/// /<@.*?>/g regex for mention btw
const words = [
  'banana',
  'space',
  'apples',
  'spices',
  'sprite',
  'cristmas',
  'hostpital',
  'moon',
  'earth',
  'dbl',
  'moonlight',
  'pokemon',
  'crystal',
  'charm',
  'antidote',
  'eclipse',
  'book',
  'school'
]

// Queue status template
const hangman = new HangmanGame({
  title: 'Hangman Started!', // Title of the embed while displaying the game. Default: Hangman
  color: 'RANDOM', // Color of the embed. Default: RANDOM
  timestamp: true, // Will set timestamp for embeds. Default: true
  gameOverTitle: 'Game Over!', // Will set the embed title of the game over embed. Default: 'Game Over'
  words: words // Custom set of words. Deafult: './words.json'
});

client.muted = require("./muted.json");

function getToday() {
  let today = new Date();
  let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
  let suffix = [`st`, `nd`, `rd`];
  return `${today.getDate()}${suffix[today.getDate()] || `th`} of ${months[today.getMonth()]}`;
}

require('http').createServer((req, res) => res.end()).listen(5030)

var nonos = [
  'fuck', 'pussy', 'bitch', 'hoe', 'whore', 'slut', 'cunt', 'piss', 'shit', 'damn', 'nigga', 'nigger', 'retard', 'dickhead', 'dipshit', 'ass', 'asshat', 'motherfucker', 'bitchass', 'bitch ass', 'Fuck', 'Pussy', 'Bitch', 'Hoe', 'Whore', 'Slut', 'Cunt', 'Piss', 'Shit', 'Damn', 'Nigga', 'Nigger', 'Retard', 'Dickhead', 'Dipshit', 'Ass', 'Asshat', 'Motherfucker', 'Bitchass', 'bitch ass'
]




const status = (queue) => `*Music Volume: \`${queue.volume}%\` - Filters: \`${queue.filter || "Off"}\` - Looping: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` - Autoplaying: \`${queue.autoplay ? "On" : "Off"}\`*`;

distube
  .on("playSong", (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`〉**Playing \`${song.name}\` - \`${song.formattedDuration}\`**\n*Requested by: ${song.user}*\n${status(queue)}`)

  ))
  .on("addSong", (message, queue, song) => message.channel.send(
    new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`〉**Added ${song.name} - \`${song.formattedDuration}\` to the queue**\n *Requested by: ${song.user}*`)


  ))
  .on("playList", (message, queue, playlist, song) => message.channel.send(
    new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(` **Playing \`${playlist.name}\` - All songs ${playlist.songs.length}**\n*Requested by: ${song.user}*\n\n〉**Now playing \`${song.name}\` - \`${song.formattedDuration}\`**\n${status(queue)}`)


  ))
  .on("addList", (message, queue, playlist) => message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`〉**Added \`${playlist.name}\` - All songs ${playlist.songs.length} to queue\n${status(queue)}`)


  ))
  // DisTubeOptions.searchSongs = true
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`〉**Choose a number from the list below**\n${result.map(song => `**${++i}:** ***\`${song.name}\` - \`${song.formattedDuration}\`***`).join("\n")}\n\n〉*Enter anything else to cancel*`)
    );
  })
  .on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 70;
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) => message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`〉Searching canceled`)
  ))
  .on("error", (message, e) => {
    console.error(e)
    message.channel.send("An error encountered: " + e);
  });


client.on('ready', () => {
  client.setInterval(() => {
    for (let i in client.muted) {
      let time = client.muted[i].time;
      let guildId = client.muted[i].guild;
      let guild = client.guilds.cache.get(guildId);
      let member = guild.members.cache.get(i);
      let mutedRole = guild.roles.cache.get(mR => mR.name === "Muted");
      if (!mutedRole) continue;

      if (Date.now() > time) {
        member.removeRole(mutedRole);
        delete client.muted[i];

        fs.writeFile("./muted.json", JSON.stringify(client.muted), err => {
          if (err) throw err;
        });
      }
    }
  }, 5000);

  client.user.setActivity("m!help", {
    type: "WATCHING"
  });
  console.log(`Prefix is: ${config.prefix}`)
  console.log(`Name is: ${client.user.username}`)
});

const usersMap = new Map();

const LIMIT = 20;
const TIME = 25000;
const DIFF = 9500;

client.on("message", async message => {



  if (message.author.bot) return;






  if (usersMap.has(message.author.id)) {
    let moderate = db.get(`modspam_${message.guild.id}`);
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    if (difference > DIFF) {
      clearTimeout(timer);
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME)
      usersMap.set(message.author.id, userData)
    }
    ++msgCount;
    if (parseInt(msgCount) === LIMIT) {
      if (!moderate) return;
      message.channel.send({ embed: { color: ('RANDOM'), description: (`<:MeruNo:952435833649106964> | Please do not spam, this is your warning message. If you continue to spam you will be muted for 20 minutes, if you spam again you will be banned.`) } });
      usersMap.get(message.author.id).isWarned = true;
      if (usersMap.get(message.author.id).isWarned) {
        var role = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!role) {
          try {
            muterole = await message.guild.roles.create({ data: { name: 'Muted', color: ('#000'), permissions: [] } })
            message.guild.channels.cache.forEach(async (channel, id) => {
              await channel.updateOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_message: false,
                CONNECT: false
              });
            });
          } catch (e) {
            console.log(e.stack);
          }
        }
        message.member.roles.add(role);
        message.channel.send({ embed: { color: ('RANDOM'), description: (`You have been muted for 20 minutes for spamming, this is your final warning after this you will be muted indefinately or until staff has unmuted you.`) } });
        setTimeout(() => {
          message.member.roles.remove(role);
          message.channel.send({ embed: { color: ('RANDOM'), description: (`Your 20 minute mute is up, next time you will be muted indefinatly, until staff deal with you.`) } });
        }, 1200000);
      }

    } else {
      userData.msgCount = msgCount;
      usersMap.set(message.author.id, userData);
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
    }, 1000000)
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }

  xp(message);
  function xp(message) {
    if (message.author.bot) return;


    let xp = db.add(`xp_${message.guild.id}_${message.author.id}`, 1);
    let level = Math.floor(0.3 * Math.sqrt(xp));
    let lvl = db.get(`level_${message.guild.id}_${message.author.id}`) || db.set(`level_${message.guild.id}_${message.author.id}`, 1);;
    if (level > lvl) {
      let newLevel = db.set(`level_${message.guild.id}_${message.author.id}`, level);



      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author.toString()}, You just advanced to level ${newLevel} congrats!`));
    }
  }

  message.mentions.users.forEach((user) => {
    if (db.has(user.id + 'afk')) {
      let reason = db.get(message.guil.id + `${message.author.id}afk`)
      if (!reason) reason = 'No reason';
      let embed1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`<@${user.id}> is afk for: ${reason}`)


      message.channel.send(embed1)
    }
  })


  if (db.has(message.author.id + `${message.author.id}afk`)) {
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`${message.author} welcome back, i have removed your afk.`)


    message.channel.send(embed);
    db.delete(message.guild.id + `${message.author.id}afk`);
    db.delete(message.guild.id + `${message.author.id}messageAFK`);
  }

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefix: config.prefix
    }
  }
  let prefix = prefixes[message.guild.id].prefix;
  if (nonos.some(word => message.content.startsWith(word))) {
    if (!db.get(`modbadword_${message.guild.id}`)) return;

    let whitelist = await db.fetch(`whitelistedbw_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Badword Detected:\n**Cuss words are not permitted on this server**\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('discord.gg/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = await db.fetch(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('discord.com/invite/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('discord.io/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('discord.st/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('https://discord.gg/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('https://discord.st/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('https://discord.io/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.includes('https://discord.com/invite/')) {
    if (!db.get(`modinvite_${message.guild.id}`)) return;

    let whitelist = db.get(`whitelistedil_${message.guild.id}`);

    if (message.member.roles.cache.has(whitelist)) return;

    if (!message.member.roles.cache.has(whitelist)) {
      message.delete()
      message.channel.send({ embed: { color: ('#ff3636'), description: ('<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role') } }).then(message => message.delete({ timeout: 5000 }));
    }
  }
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();



  if (command === "automod") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    if (args[0] === "on") {
      db.set(`automodon_${message.guild.id}`, active);
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Automoderation Feature!__**\n\n **What is the automod feature?**\n*The automod feature is a command for moderators so they dont have to moderate everything and take a little off there backs!!*\n\n **Want to turn this feature off?** \`\`\`${prefix}automod off\`\`\``)


      message.channel.send(embed)
    } else if (args[0] === "off") {
      db.delete(`automodon_${message.guild.id}`);
      let embed = new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`<:MeruNo:952435833649106964> | **__Disabled The Automoderation Feature!__**\n\n **What is the automod feature?**\n*The automod feature is a command for moderators so they dont have to moderate everything and take a little off there backs!!*\n\n **Want to turn this feature on?** \`\`\`${prefix}automod off\`\`\``)


      message.channel.send(embed);
    } else {
      let status = db.get(`automodon_${message.guild.id}`);
      if (status === null) status = 'Off | <:MeruNo:952435833649106964> ';
      let sstatus = db.get(`modspam_${message.guild.id}`);
      if (sstatus === null) sstatus = 'Off | <:MeruNo:952435833649106964> ';
      let istatus = db.get(`modinvite_${message.guild.id}`);
      if (istatus === null) istatus = 'Off | <:MeruNo:952435833649106964> ';
      let bstatus = db.get(`modbadword_${message.guild.id}`);
      if (bstatus === null) bstatus = 'Off | <:MeruNo:952435833649106964> ';
      let lstatus = db.get(`modlogging_${message.guild.id}`);
      if (lstatus === null) lstatus = 'Off | <:MeruNo:952435833649106964> ';

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`> __**Automated Moderation is currently turned ${status}**__\n\n> __**The Automated feautures:**__\n*badwords, message-spam, invite-links*\n\n> __**The Feature Statuses:**__\n **Message Spam Filter is turned ${sstatus}**\n **Moderation Logging is turned ${lstatus}**\n **Invite Links Filter is turned ${istatus}**\n **Badwords Filter is turned ${bstatus}** \n\n*If you want to enable any of the features just do,*\`\`\`Use ${prefix}[feature] [on/off] to switch between modes!\`\`\`\n*Want to enable Automoderating?,*\`\`\`Use ${prefix}[automod] [on/off] to toggle it on and off!\`\`\``)


      message.channel.send(embed);
    }
  }
  if (command === "ping") {

    const m = await message.channel.send({ embed: { color: ('RANDOM'), description: (`Ping?`) } });
    m.edit(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setFooter("pong command info")
      .setDescription(`**Message Latency** \n<:online:952437416352964699> ${Date.now() - message.createdTimestamp}ms.\n**API Latency** \n<:online:952437416352964699> ${Math.round(client.ws.ping)}ms\n**DB Latency**\n<:online:952437416352964699> ${botpinggu}ms`)
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setTimestamp())
  }
  if (command === "antiraid") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    if (args[0] === "on") {
      db.set(`antiraidon_${message.guild.id}`, on);
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Anti Server Raiding Feature!__**\n\n **What is the anti-raid feature?**\n*The anti-raid features are custom commands built to  help stop raids right in there  tracks from closing the entire server so no one can speak, to joinbans to instantly ban users on join!*\n\n **Want to turn this feature off?** \`\`\`${prefix}antiraid off\`\`\``)


      message.channel.send(embed)
    } else if (args[0] === "off") {
      db.delete(`antiraidon_${message.guild.id}`);
      let embed = new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`<:MeruNo:952435833649106964> | **__Disabled The Automoderation Feature!__**\n\n **What is the anti-raid feature?**\n*The anti-raid features are custom commands built to  help stop raids right in there  tracks from closing the entire server so no one can speak, to joinbans to instantly ban users on join!*\n\n **Want to turn this feature on?** \`\`\`${prefix}antiraid off\`\`\``)


      message.channel.send(embed);
    } else if (args[0] === "role") {
      let role = args[1]
      if (!message.guild.roles.cache.get(role)) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`<:MeruNo:952435833649106964> | invalid role for members [ when setting this up please use the default role all members are given ]`))

      db.set(`memberrole_${message.guild.id}`, role);
      message.channel.send(new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810> | Lockdown role has been set to <@&${role}>`))
    } else {
      let status = db.get(`antiraidon_${message.guild.id}`);
      if (status === null) status = 'Deactivated | <:MeruNo:952435833649106964> ';
      let sstatus = db.get(`raidclose_${message.guild.id}`);
      if (sstatus === null) sstatus = 'Deactivated | <:MeruNo:952435833649106964> ';
      let istatus = db.get(`raidunder_${message.guild.id}`);
      if (istatus === null) istatus = 'Deactivated | <:MeruNo:952435833649106964> ';
      let bstatus = db.get(`raidjoin_${message.guild.id}`);
      if (bstatus === null) bstatus = 'Deactivated | <:MeruNo:952435833649106964> ';
      let dstatus = db.get(`raidslow_${message.guild.id}`);
      if (dstatus === null) dstatus = 'Deactivated | <:MeruNo:952435833649106964> ';

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`> __**Anti-Raiding is currently ${status}**__\n\n> __**The Anti-raid feautures:**__\n*close/open, underraid, joinban, slowmode, lock/unlock*\n\n> __**The Feature Statuses:**__\n **Concealed Mode is currently ${sstatus}**\n **Underraid Mode is currently ${istatus}**\n **Joinban Mode is currently ${bstatus}**\n**Slowmode Feature is currently ${dstatus}**\n\n*If you want to enable any of the features just do,*\`\`\`Use ${prefix}[feature] [on/off] to switch between modes!\`\`\`\n*Want to enable Anti-raiding?,*\`\`\`Use ${prefix}[antiraid] [on/off] to toggle it on and off!\`\`\`\n> __**New feature!**__\n\`\`\`Use ${prefix}[antiraid] [role] [roleid] to set the role for your default members!\`\`\`\n\n> __**What is this for?**__\n*This new feature is so if you have a autorole bot enabled whatever your default member role is [e.x: Members, New Friends ect] when a raid happens this role will be locked down!*`)


      message.channel.send(embed);
    }
  }
  if (command === "slowmode") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the antiraid feature first before using this command!`)


    if (!db.get(`antiraidon_${message.guild.id}`)) return message.channel.send(embed);
    if (args[0] === "on") {
      let duration = args[1].toLowerCase()
      if (isNaN(duration)) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription('<:MeruNo:952435833649106964> | Slowmode canceled no number out putted [e.x: 60 = 1m]'))

      db.set(`raidslow_${message.guild.id}`, on)
      message.channel.setRateLimitPerUser(duration).then(message.channel.send(new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Slowmode Feature!__**\n\n **What is the slowmode feature?**\n*The slowmode feature is part of the antiraid commands and category, this command slowsdown the message channel for you with the amount of seconds!*\n\n **Want to turn this Feature off?** \`\`\`${prefix}slowmode off\`\`\``)
      ))

    } else if (args[0] === "off") {
      let duration = '0';
      db.delete(`raidslow_${message.guild.id}`)
      message.channel.setRateLimitPerUser(duration).then(message.channel.send(new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Disabled The Slowmode Feature!__**\n\n **What is the slowmode feature?**\n*The slowmode feature is part of the antiraid commands and category, this command slowsdown the message channel for you with the amount of seconds!*\n\n **Want to turn this Feature back on?** \`\`\`${prefix}slowmode on\`\`\``)
      ))
    } else {


      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`*Do you want to turn this feature on? use*\`\`\`${prefix}slowmode on\`\`\` \n\n*Do you want to turn this feature off? use*\`\`\`${prefix}slowmode off\`\`\``)


      return message.channel.send(embed);
    }
  }
  if (command === "underraid") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the antiraid feature first before using this command!`)


    if (!db.get(`antiraidon_${message.guild.id}`)) return message.channel.send(embed);
    if (args[0] === "on") {
      let role = db.get(`memberrole_${message.guild.id}`);
      if (!role) return message.channel.send({ embed: { color: ('#ff3636'), description: ("<:MeruNo:952435833649106964> | No member role in the database") } });

      message.guild.roles.cache.find(r => r.id === `${role}`);
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(role, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          CREATE_INSTANT_INVITE: false,
          ADD_REATIONS: false
        });
      });
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Under Raid Feature!__**\n\n **What is the underraid feature?**\n*The underraid feature is part of the antiraid commands and category, this command locks down your server which disables the role you set by running \`${prefix}antiraid role [roleid]\` so that role cant speak, add reactions, create invites and join ALL channels on your discord server!*\n\n **Want to turn this Feature off?** \`\`\`${prefix}underraid off\`\`\``)


      message.channel.send(embed);
      db.set(`raidunder_${message.guild.id}`, on);
    } else if (args[0] === "off") {
      let role = db.get(`memberrole_${message.guild.id}`);
      if (!role) return message.channel.send({ embed: { color: ('#ff3636'), description: ("<:MeruNo:952435833649106964> | No member role in the database") } });

      message.guild.roles.cache.find(r => r.id === `${role}`);
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(role, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          CREATE_INSTANT_INVITE: true,
          ADD_REATIONS: true
        });
      });
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Disabled The Under Raid Feature!__**\n\n **What is the underraid feature?**\n*The underraid feature is part of the antiraid commands and category, this command locks down your server which disables the role you set by running \`${prefix}antiraid role [roleid]\` so that role cant speak, add reactions, create invites and join ALL channels on your discord server!*\n\n **Want to turn this Feature back on?** \`\`\`${prefix}underraid on\`\`\``)


      message.channel.send(embed);
      db.delete(`raidunder_${message.guild.id}`);
    } else {

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`*Do you want to turn this feature on? use*\`\`\`${prefix}underraid on\`\`\` \n\n*Do you want to turn this feature off? use*\`\`\`${prefix}underraid off\`\`\``)


      return message.channel.send(embed);
    }
  }
  if (command === "conceal") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the antiraid feature first before using this command!`)


    if (!db.get(`antiraidon_${message.guild.id}`)) return message.channel.send(embed);
    let deni = db.get(`memberrole_${message.guild.id}`)
    if (!deni) return message.channel.send({ embed: { color: ('#ff3636'), description: ("<:MeruNo:952435833649106964> | No member role in the database") } });
    let role = message.guild.roles.cache.find(r => r.id === `${deni}`);
    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(role, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      });
    });

    db.set(`raidclose_${message.guild.id}`, on)
    message.channel.send(new Discord.MessageEmbed()
      .setColor('#57cf23')
      .setDescription(`<:MeruYes:952435870491893810> | **Turned the Close mode On!**\n\n **What is close mode?**\nClose mode is for closing off your server for when you are updating it or in a raid, and as it says it denies the role you set using the automod permission to see all channels in the server unless you allow them by manually enabling it\n\n **Want to turn off close mode? use,**\n\`\`\`${prefix}reveal\`\`\``)
    )
  }
  if (command === "reveal") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the antiraid feature first before using this command!`)


    if (!db.get(`antiraidon_${message.guild.id}`)) return message.channel.send(embed);
    let deni = db.get(`memberrole_${message.guild.id}`)
    if (!deni) return message.channel.send({ embed: { color: ('#ff3636'), description: ("<:MeruNo:952435833649106964> | No member role in the database") } });
    let role = message.guild.roles.cache.find(r => r.id === `${deni}`);
    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(role, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });
    });

    db.delete(`raidclose_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
      .setColor('#57cf23')
      .setDescription(`<:MeruYes:952435870491893810> | Turned the Close mode Off!**\n\n** **What is close mode?**\nClose mode is for closing off your server for when you are updating it or in a raid, and as it says it denies the role you set using the automod permission to see all channels in the server unless you allow them by manually enabling it\n\n **Want to turn on close mode? use,**\n\`\`\`${prefix}conceal\`\`\``)
    )
  }
  if (command === "setup") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let ok = '<:MeruYes:952435870491893810> ';
    let no = '<:MeruNo:952435833649106964>';


    if (args[0] === "muterole") {
      let role = args[1]
      if (!message.guild.roles.cache.get(role)) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`${no} | Setup has been canceled, muterole id was invalid.`))


      db.set(`muterole_${message.guild.id}`, role);
      message.channel.send(new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`${ok} | Muterole has been set to <@&${role}>\n\n**Finished muterole setup!**`))

    } else if (args[0] === "whitelist") {
      let role2 = args[1]
      if (!message.guild.roles.cache.get(role2)) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`${no} | Setup has been canceled, whitelist id was invalid.`))


      db.set(`whitelistedil_${message.guild.id}`, role2);
      db.set(`whitelistedbw_${message.guild.id}`, role2);
      message.channel.send(new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`${ok} | Whitelist role has been set to <@&${role2}>\n\n**Finished whitelist setup!**`))
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**> <:MeruYes:952435870491893810>  | __Welcome to  Server Setup [ BETA v.1 ]__**\n\n>  __**What is setup for?**__\n* server setup is so you can configure roles before hand and learn more about features*\n>  __**What is Automod?**__\n*automod is the automoderation feature included with the bot to take some of the work of your staff's back.*\n\>  __**What is antiraid?**__\n*The antiraid feature also included with the bot is to help your server out during a raid.*\n>  __**Want to setup your muterole?**__\nType the command  \`\`\`${prefix}setup muterole [roleid]\`\`\` \n> __**Want to setup the whitelisted roles?**__\nType the command \`\`\`${prefix}setup whitelist [roleid]\`\`\``)


      return message.channel.send(embed);
    }
  }




  if (message.content.startsWith(prefix + 'message-spam')) {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the automod feature first before using this command!`)


    if (!db.get(`automodon_${message.guild.id}`)) return message.reply(embed)

    if (args[0] === "on") {
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Message Spam Filter!__**\n\n **What is the message spam Filter?**\n*The message spam Filter is for auto moderating message spam, if a users sends a message [default 10] times they will be warned [1 warns = mute 20 minutes] in the server!*\n\n **Want to turn this Filter off?** \`\`\`${prefix}message-spam off\`\`\``)


      message.channel.send(embed);
      db.set(`modspam_${message.guild.id}`, active);
    } else if (args[0] === "off") {
      let embed = new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`<:MeruNo:952435833649106964> | **__Disabled The Message Spam Filter!__**\n\n **What is the message spam Filter?**\n*The message spam Filter is for auto moderating message spam, if a users sends a message [default 10] times they will be warned [1 warns = mute 20 minutes] in the server!*\n\n **Ever want to turn this Filter back on?** \`\`\`${prefix}message-spam on\`\`\``)



      message.channel.send(embed);
      db.delete(`modspam_${message.guild.id}`);
    } else {

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`*Do you want to turn this feature on? use*\`\`\`${prefix}message-spam on\`\`\` \n\n*Do you want to turn this feature off? use*\`\`\`${prefix}message-spam off\`\`\``)


      return message.channel.send(embed);
    }
  }

  if (message.content.startsWith(prefix + 'invite-links')) {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the automod feature first before using this command!`)

    if (!db.get(`automodon_${message.guild.id}`)) return message.reply(embed)

    if (args[0] === "on") {
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Invite Links Filter!__**\n\n **What is the Invite links Filter?**\n*The Invite links filter is for auto moderating invite links this filter will scan each message and if it has [ discord.gg, discord.com/invites, discord.io, and discord.st ] they will be deleted!*\n\n **Want to turn this Filter off?** \`\`\`${prefix}invite-links off\`\`\``)


      message.channel.send(embed);
      db.set(`modinvite_${message.guild.id}`, active);
    } else if (args[0] === "off") {
      let embed = new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`<:MeruNo:952435833649106964> | **__Disabled The Invite Links Filter!__**\n\n **What is the Invite links Filter?**\n*The Invite links filter is for auto moderating invite links this filter will scan each message and if it has [ discord.gg, discord.com/invites, discord.io, and discord.st ] they will be deleted!*\n\n **Ever want to turn this Filter back on?** \`\`\`${prefix}invite-links on\`\`\``)



      message.channel.send(embed);
      db.delete(`modinvite_${message.guild.id}`);
    } else {


      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`*Do you want to turn this feature on? use*\`\`\`${prefix}invite-links on\`\`\` \n\n*Do you want to turn this feature off? use*\`\`\`${prefix}invite-links off\`\`\`\n\n*Do you want to whitelist a role? use*\`\`\`${prefix}invite-links whitelist [role id]\`\`\`\n\n*Do you want to remove a whitelisted role? use*\`\`\`${prefix}invite-links remove [roleid]\`\`\``)


      return message.channel.send(embed);
    }
  }
  if (command === "serverinfo") {
    let whitelist = db.get(`whitelistedil_${message.guild.id}`);
    if (whitelist) whitelist = `<@&${whitelist}>`;
    if (whitelist === null) whitelist = 'No whitelisted roles for this server';
    let muterole = db.get(`muterole_${message.guild.id}`);
    if (muterole) muterole = `<@&${muterole}>`;
    if (muterole === null) muterole = 'No muterole for this server';
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .addFields({
        name: 'Guild name',
        value: `${message.guild.name}`,
        inline: true
      }, {
          name: 'Guild Channels',
          value: `| ${message.guild.channels.cache.filter((c) => c.type !== "category").size} cached voice and test channels!`,
          inline: true
        }, {
          name: 'Text Channels',
          value: `| ${message.guild.channels.cache.filter((c) => c.type === "text").size} cached test channels`,
          inline: true
        }, {
          name: 'Voice Channels',
          value: `| ${message.guild.channels.cache.filter((c) => c.type === "voice").size} cached voice channels`,
          inline: true
        }, {
          name: 'Guild Member Count',
          value: `| ${message.guild.members.cache.filter(member => !member.user.bot).size} cached humans and ${message.guild.members.cache.filter(member => member.user.bot).size} cached bots`,
          inline: true
        }, {
          name: 'Mute Role',
          value: `| ${muterole}`,
          inline: true
        }, {
          name: 'Whitelisted Role(s)',
          value: `| ${whitelist}`,
          inline: true
        }, {
          name: 'Created at',
          value: `${message.channel.guild.createdAt.toUTCString().substr(0, 16)}`,
          inline: true
        })


    message.channel.send(embed);
  }
  if (message.content.startsWith(prefix + 'badwords')) {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let embed = new Discord.MessageEmbed()
      .setColor('#ff3636')
      .setDescription(`<:MeruNo:952435833649106964> | Plase enable the automod feature first before using this command!`)

    if (!db.get(`automodon_${message.guild.id}`)) return message.reply(embed)

    if (args[0] === "on") {
      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`<:MeruYes:952435870491893810>  | **__Enabled The Badwords Filter!__**\n\n __**What is the Badowrds Filter?**\n*The bad words filter is a custom filter for keeping all swear words out of your discord server! with configurable roles for whitelisting and more*\n\n __**Want to turn this Filter off?** \`\`\`${prefix}badwordss off\`\`\``)


      message.channel.send(embed);
      db.set(`modbadword_${message.guild.id}`, active);
    } else if (args[0] === "off") {
      let embed = new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription(`<:MeruNo:952435833649106964> | **__Disabled The Badwords Filter!__**\n\n **What is the Badwords Filter?**\n*The bad words filter is a custom filter for keeping all swear words out of your discord server! with configurable roles for whitelisting and more*\n\n **Ever want to turn this feature on?*** \`\`\`${prefix}badwords on\`\`\``)



      message.channel.send(embed);
      db.delete(`modbadword_${message.guild.id}`);
    } else {

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`*Do you want to turn this feature on? use*\`\`\`${prefix}badwords on\`\`\` \n\n*Do you want to turn this feature off? use*\`\`\`${prefix}badwords off\`\`\`\n\n*Do you want to whitelist a role? use*\`\`\`${prefix}badwords whitelist [role id]\`\`\`\n\ __**Do you want to remove a whitelisted role? use*\`\`\`${prefix}badwords remove [roleid]\`\`\``)


      return message.channel.send(embed);
    }
  }
  if (command === "whitelist") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

    if (args[0] === "add-il") {
      let wrole = args[1]

      if (isNaN(wrole)) return message.channel.send({ embed: { color: ('#ff3636'), description: ("`<:MeruNo:952435833649106964> | You must provide a valid role id, check to make sure the one provided it valid") } });

      db.set(`whitelistedil_${message.guild.id}`, wrole)

      message.channel.send({ embed: { color: ('#57cf23'), description: ("<:MeruYes:952435870491893810>  | You have Configured the whitelisted role, the role [ <@&" + wrole + "> ] has been added to whitelisting") } });
    } else if (args[0] === "remove-il") {
      let wrole = args[1]

      if (isNaN(wrole)) return message.channel.send({ embed: { color: ('#ff3636'), description: ("`<:MeruNo:952435833649106964> | You must provide a valid role id, check to make sure the one provided it valid, if it is check to see if it is on the current whitelist") } });
      db.delete(`whitelistedil_${message.guild.id}`, wrole)

      message.channel.send({ embed: { color: ('#57cf23'), description: ("<:MeruYes:952435870491893810>  |  Removed that role from whitelisting!") } });
    } else if (args[0] === "add-bw") {
      let wrole = args[1]

      if (isNaN(wrole)) return message.channel.send({ embed: { color: ('#ff3636'), description: ("`<:MeruNo:952435833649106964> | You must provide a valid role id, check to make sure the one provided it valid") } });

      db.set(`whitelistedbw_${message.guild.id}`, wrole)

      message.channel.send({ embed: { color: ('#57cf23'), description: ("<:MeruYes:952435870491893810>  | You have Configured the whitelisted role, the role [ <@&" + wrole + "> ] has been added to whitelisting") } });
    } else if (args[0] === "remove-bw") {
      let wrole = args[1]

      if (isNaN(wrole)) return message.channel.send({ embed: { color: ('#ff3636'), description: ("`<:MeruNo:952435833649106964> | You must provide a valid role id, check to make sure the one provided it valid, if it is check to see if it is on the current whitelist") } });
      db.delete(`whitelistedbw_${message.guild.id}`, wrole)

      message.channel.send({ embed: { color: ('#57cf23'), description: ("<:MeruYes:952435870491893810>  |  Removed that role from whitelisting!") } });
    } else if (args[0] === "list-bw") {
      let bdrole = db.get(`whitelistedbw_${message.guild.id}`)
      if (!bdrole) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription('<:MeruNo:952435833649106964> | No whitelisted roles for the badword filter'))

      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`> <:MeruYes:952435870491893810> | __**All whitelisted badword roles**__\n\n<@&${bdrole}>`)

      message.channel.send(embed);
    } else if (args[0] === "list-il") {
      let ilrole = db.get(`whitelistedil_${message.guild.id}`)
      if (!ilrole) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff3636')
        .setDescription('<:MeruNo:952435833649106964> | No whitelisted roles for the invite link filter'))

      let embed = new Discord.MessageEmbed()
        .setColor('#57cf23')
        .setDescription(`> <:MeruYes:952435870491893810> | __**All whitelisted invitelink roles**__\n\n<@&${ilrole}>`)

      message.channel.send(embed);
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**> <:MeruYes:952435870491893810> | __Welcome to Merumu Whitelisting [ BETA v.1 ]__**\n\n  __**What is this?**__\n*Merumu whitelisting is where you can [ add, remove, view ] all your whitelisted roles for automod and antiraid anywhere in your server by runnning this command*\n\n  __**What is Automod?**__\n*automod is the automoderation feature included with the bot to take some of the work of your staff's back. some of its features include logging, badwords filter, message spam, invitelinks and more!*\n\n  __**What is antiraid?**__\n*The antiraid feature also included with the bot is to help your server out during a raid. some of its features are close where if you are updating the server close with close it off so nobody can read text channels unless you manually enable it or underraid which locks your entire server down!*\n\n  __**Want to add a role to whitelisting or to a spesific category?**__\nType the commands  \`\`\`${prefix}whitelist add-il (il means invite links) [role id]\`\`\` \`\`\`${prefix}whitelist add-bw (bw means badwords) [role id]\`\`\` \`\`\`or ${prefix}whitelisting add [role id]\`\`\`  \n  __**Want to delete a whitelisted role or roles?**__\nType the commands  \`\`\`${prefix}whitelist remove-bw (bw means badwords) [role id]\`\`\` \`\`\`${prefix}whitelist remove-il (il means invite links) [role id]\`\`\` \`\`\`or ${prefix}whitelisting remove [role id]\`\`\` \n>  __**Want to view your whitelisted roles?**__\nType the command \`\`\`${prefix}whitelist list-bw\`\`\` \`\`\`${prefix}whitelist list-il\`\`\``)


      return message.channel.send(embed);
    }
  }
  if (command === "whitelisting") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    if (args[0] === "add") {
      let wrole = args[1]

      if (isNaN(wrole)) return message.channel.send({ embed: { color: ('#ff3636'), description: ("<:MeruNo:952435833649106964> | You must provide a valid role id, check to make sure the one provided it valid") } });

      db.set(`whitelistedil_${message.guild.id}`, wrole)
      db.set(`whitelistedbw_${message.guild.id}`, wrole)

      message.channel.send({ embed: { color: ('#57cf23'), description: ("<:MeruYes:952435870491893810>  | You have Configured the whitelisted role, the role [ <@&" + wrole + "> ] has been added to whitelisting") } });
    } else if (args[0] === "remove") {
      let wrole = args[1]

      if (isNaN(wrole)) return message.channel.send({ embed: { color: ('#ff3636'), description: ("`<:MeruNo:952435833649106964> | You must provide a valid role id, check to make sure the one provided it valid, if it is check to see if it is on the current whitelist") } });
      db.delete(`whitelistedil_${message.guild.id}`, wrole)
      db.delete(`whitelistedbw_${message.guild.id}`, wrole)

      message.channel.send({ embed: { color: ('#57cf23'), description: ("<:MeruYes:952435870491893810>  |  Removed that role from whitelisting!") } });
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**> <:MeruYes:952435870491893810> | __Welcome to Merumu Whitelisting [ BETA v.1 ]__**\n\n  __**What is this?**__\n*Merumu whitelisting is where you can [ add, remove, view ] all your whitelisted roles for automod and antiraid anywhere in your server by runnning this command*\n\n  __**What is Automod?**__\n*automod is the automoderation feature included with the bot to take some of the work of your staff's back. some of its features include logging, badwords filter, message spam, invitelinks and more!*\n\n  __**What is antiraid?**__\n*The antiraid feature also included with the bot is to help your server out during a raid. some of its features are close where if you are updating the server close with close it off so nobody can read text channels unless you manually enable it or underraid which locks your entire server down!*\n\n  __**Want to add a role to whitelisting or to a spesific category?**__\nType the commands  \`\`\`${prefix}whitelist add-il (il means invite links) [role id]\`\`\` \`\`\`${prefix}whitelist add-bw (bw means badwords) [role id]\`\`\` \`\`\`or ${prefix}whitelisting add [role id]\`\`\`  \n  __**Want to delete a whitelisted role or roles?**__\nType the commands  \`\`\`${prefix}whitelist remove-bw (bw means badwords) [role id]\`\`\` \`\`\`${prefix}whitelist remove-il (il means invite links) [role id]\`\`\` \`\`\`or ${prefix}whitelisting remove [role id]\`\`\` `)


      return message.channel.send(embed);
    }
  }
  if (command === "eval") {
    if (message.author.id !== config.owner2) return;
    function clean(text) {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    } try {
      const code = args.join(" ");
      let evaled = eval(code);
      let rawEvaled = evaled;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);




      let embed = new Discord.MessageEmbed()
        .setTitle(`Evaluated in ${Math.round(client.ws.ping)}ms`)
        .addField(":inbox_tray: Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${clean(evaled).replace(config.token, "i dont have a token - moon")}\n\`\`\``)
        .addField('Type', `\`\`\`xl\n${(typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1)}\n\`\`\``)
        .setColor('GREEN');
      message.channel.send({ embed });

    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  if (command === "warn") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Command: ${prefix}warn**\n\n**Description**: warns a member\n**Usage**: ${prefix}warn [user] [reason]\n**Example**: ${prefix}warn @shivaco broke a rule\n**Cooldown**: None`)


    let userid = (message.mentions.members.first());
    if (userid === message.author) return;
    if (!userid) return message.channel.send(embed);
    let reason = args.join(" ").slice(22)
    if (!reason) reason = 'No reason provided';
    let issuer = message.author.id;
    database.addWarning(message.guild.id, userid, d, reason, issuer)

    message.channel.send({ embed: { color: ('#ff3636'), description: (`<:RosesLoop:783811589350096986> ***<@${userid.id}> (${userid.id}) has been warned***`) } });
  }
  if (command === "unwarn") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Command: ${prefix}unwarn**\n\n**Description**: unwarns a member\n**Usage**: ${prefix}unwarn [user] [reason]\n**Example**: ${prefix}unwarn @shivaco broke a rule\n**Cooldown**: None`)


    let userid = (message.mentions.members.first());
    if (userid === message.author) return;
    if (!userid) return message.channel.send(embed);

    // Remove last warning made in the guild.
    if (args[1] == "last") {
      database.removeWarning(message.guild.id)
      message.channel.send({
        embed: {
          color: `#ff3636`,
          description: `<:RosesLoop:783811589350096986>  ***the last user has been unwarned***`
        }
      })
        .catch(() => {
          message.channel.send({
            embed: {
              color: `#ff3636`,
              description: "<:MeruNo:952435833649106964>   Failed to remove warning..."
            }
          });
        });
    }
    // Remove a specific warning from a user
    let userId = (message.mentions.members.first());
    if (userId === message.author) return;
    let warningNum = (args[2]) ? parseInt(args[2]) : 1;
    database.removeWarning(message.guild.id, userId, warningNum)
    message.channel.send({
      embed: {
        color: `#ff3636`,
        description: `<:RosesLoop:783811589350096986>  ***<@${userId.id}> (${userId.id}) has been unwarned***`
      }
    })
      .catch(() => {
        message.channel.send({
          embed: {
            color: `#ff3636`,
            description: `<:MeruNo:952435833649106964>  Failed to remove warning... Double check the user and warning number. (e.x: ${prefix}unwarn [warn number] @user)`
          }
        });
      });
  }
  if (command === "warnings") {
    var userid = (message.mentions.members.first()) || message.author;
    var page = (args[2]) ? args[2] : "1";
    if (!isNaN(page)) {
      page = parseInt(page) - 1;
      database.getWarnings(message.guild.id, userid)
        .then(warnings => {
          if (warnings.length == 0) return message.channel.send("", {
            embed: {
              color: `#ff3636`,
              description: "<:MeruNo:952435833649106964> | User has no warnings."
            }
          });
          var array_chunks = Array(Math.ceil(warnings.length / 15)).fill().map((_, index) => index * 15).map(begin => warnings.slice(begin, begin + 15));
          if (page > -1 && array_chunks.length > page) {
            message.channel.send({
              embed: {
                color: `#ff3636`,
                description: ` **<:MeruYes:952435870491893810> Warnings for <@${userid.id}>  (${userid.id})**\n\n Total warnings:  ${warnings.length} | Page: ${page + 1}/${array_chunks.length}\n\n${array_chunks[page].map((warning, index) => `${index + 1})‎ Timestamp: ${warning.d}‎ | Moderator: <@${warning.issuer}>\n *Reason for the warning: ${warning.reason}*`).join("\n\n")}`
              }
            });
          }
        });
    }
  }
  if (command === "ticket") {
    let roles = db.get(`ticMerumupport_${message.guild.id}`)
    if (roles === null) roles = 'None';
    let embedd = new Discord.MessageEmbed()
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setColor('RANDOM')
      .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the ticket panel!**\n\n**What is the ticket panel?**\n*the ticket panel if for moderatiors to manage the ticket catergory, support roles and the message sent in the ticket channel on creation!*\n\n**Can normal people use the ticket panel**\n*Yes! if you want to know what commands just type \`${prefix}ticket help user\`.*\n**How can staff use the panel?**\n*If you are staff and want to use the panel just type \`${prefix}ticket help staff\`.*`)
    if (args[0] === "help") {
      if (args[1] === "user") {
        let embedd = new Discord.MessageEmbed()


          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the user Ticket Panel!**\n\n**What commands can i use?**\nwell if you want to make a ticket just type \`\`${prefix}create\`\`\n\n**How do i close my tickets**\n**if** the server has the feature enabled, you can close you own ticket by typing \`\`\`${prefix}user close\`\`\``)

        message.channel.send(embedd);
      } else if (args[1] === "staff") {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

        let embedd = new Discord.MessageEmbed()


          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the Staff Ticket Panel!**\n\n**What is this for?**\n> *this is the hub where you can edit and change everything! if you want to see support roles for the tickets just do \`\`${prefix}ticket staff\`\` or do you want to see the current message sent when a user makes a ticket? just type* \`\`${prefix}ticket msg\`\`!,\n\n**Want to do a quick setup?**\njust type \`\`\`${prefix}ticket config\`\`\``)
        message.channel.send(embedd);
      }
    } else if (args[0] === "config") {
      if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
      if (db.get(`cm_${message.guild.id}`)) return message.channel.send('you already have this setup');

      const h = await message.channel.send({ embed: { color: ('RANDOM'), description: (`Starting config setup...`) } });
      h.edit(new Discord.MessageEmbed()

        .setColor('RANDOM')
        .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the Ticket setup Interface**\n\n*Merumu has preloaded the ticket message . . .*`))
      let msg = `I have created your ticket for you, but please make sure you have a valid reason for a ticket in ${message.guild.name}, i have contacted staff and they will arrive shortly other than that have fun and enjoy your day!`
      db.set(`cm_${message.guild.id}`, msg)
      h.edit(new Discord.MessageEmbed()

        .setColor('RANDOM')
        .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the Ticket setup Interface**\n\n**The ticket message has been set to**: ${msg}\n\n**Dont like them?**\nYou can change them by editing them or restarting by running\n\`\`\`${prefix}ticket restart\`\`\`\n\n**Want to setup the support roles?**\nyou will have to do by them by typing \`${prefix}ticket staff role\``))
    } else if (args[0] === "staff") {
      if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
      if (args[1] === "message") {
        let msg = args.join(" ").slice(22)

        if (!msg) return message.channel.send(new Discord.MessageEmbed()

          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the Staff Ticket Panel!**\n\n**What is this for?**\n> *this is the hub for setting up the custom message that will be sent, this command will automatically ad a ping at the beginning so no need to worry about that just type* \`\`\`${prefix}ticket staff message [the message]\`\`\``))

        db.set(`cm_${message.guild.id}`, msg);
        await message.channel.send(new Discord.MessageEmbed()

          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Set the message to: ${msg}**`))
      } else if (args[1] === "role") {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");


        let role = args[2]
        if (!role) return message.channel.send(new Discord.MessageEmbed()

          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the Staff Ticket Panel!**\n\n**What is this for?**\n> *this is the hub for setting up the support role that will be supporting ticket creators, this command will automatically add a ping at the beginning so no need to worry about that just type* \`\`\`${prefix}ticket staff role [role id]\`\`\``))

        db.set(`ticMerumupport_${message.guild.id}`, role)
        await message.channel.send(new Discord.MessageEmbed()

          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Set the support role to: <@&${role}>**`))
      } else if (args[1] === "restart") {
        let cm = db.get(`cm_${message.guild.id}`);
        let ticket = db.get(`ticMerumupport_${message.guild.id}`);
        db.delete(cm)
        db.delete(ticket)

        message.channel.send('restarted the ticket commands you will have to resetup everything');
      } else {
        let cmstatus = db.get(`cm_${message.guild.id}`);
        if (cmstatus === null) cmstatus = 'off | <:MeruNo:952435833649106964> ';

        let embed = new Discord.MessageEmbed()


          .setColor('RANDOM')
          .setDescription(`**<:MeruYes:952435870491893810> | Welcome to the Staff Ticket Panel!**\n\n**What is this for?**\n> this is the hub where you can edit and change everything! all avalible staff features will be displayed here\n\n**Custom welcome message status: ${cmstatus}**\n\n**Support role help?**\n*All support roles <@&${roles}>*\n**want to setup the support roles?**\n\`\`\`${prefix}ticket staff role\`\`\`\n**want to setup/view/edit the custom message?**\n\`\`\`${prefix}ticket staff message\`\`\``)
        message.channel.send(embed);
      }
    } else {

      message.channel.send(embedd);
    }
  }
  if (command === "create") {
    message.react('786794723393798204')
    message.channel.send(new Discord.MessageEmbed()

      .setColor('RANDOM')
      .setDescription(`**<:MeruYes:952435870491893810> | Created the ticket channel! You will be pinged when its been made.**`)).then(ok => ok.delete({ timeout: 10000 }));

    let cmessage = db.get(`cm_${message.guild.id}`);
    if (!cmessage) cmessage = 'No current message set';
    let support = db.get(`ticMerumupport_${message.guild.id}`)
    if (!support) return message.channel.send('this guild hasnt set up the ticket support role');
    let role3 = message.guild.roles.cache.find(r => r.id === `${support}`);
    message.guild.channels.create(`ticket-${message.author.username}`, "text").then((channel) => {
      db.set(`${message.guild.id}_${message.author.id}_ticket`, true)
      channel.send(`${message.author} || <@&${support}>`)
      channel.send(new Discord.MessageEmbed()

        .setColor('RANDOM')
        .setDescription(`${cmessage}`))
      channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`*please use \`${prefix}close\` to close this ticket when it is done.*`))

      let role2 = message.guild.roles.cache.find(role => role.name === `Ticket User`);
      if (!role2) message.guild.roles.create({ data: { name: 'Ticket User', color: ('RANDOM') } });
      let member = message.author;
      message.member.roles.add(role2);


      channel.updateOverwrite(role3, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });
      channel.updateOverwrite(role2, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });

      let rolee = message.guild.roles.cache.find(role => role.name === `@everyone`);
      message.channel.updateOverwrite(rolee, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      });
    });
  }
  if (command === "close") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_CHANNELS")) return message.channel.send("You need to be an admin to use this command.");
    if (!db.get(`${message.guild.id}_${message.author.id}_ticket`)) return;

    let embed = new Discord.MessageEmbed()

      .setColor('RANDOM')
      .setDescription(`**Hold on**, Are you sure you want to close this ticket? \`please type ${prefix}close confirm\` to confirm this action`)
    message.channel.send(embed);
    if (args[0] === "confirm") {
      await message.channel.delete();
    }
  }
  if (command === "unban") {
    const rgx = /^(?:<@!?)?(\d+)>?$/;
    if (!message.member.hasPermission("ADMINISTRATOR", "BAN_MEMBERS")) return message.channel.send("You need to be an admin to use this command.");

    const id = args[0];
    if (!rgx.test(id)) return message.reply('Please provide a valid user ID');
    const bannedUsers = await message.guild.fetchBans();
    const user = bannedUsers.get(id).user;
    if (!user) return message.reply('Unable to find user, please check the provided ID');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    await message.guild.members.unban(user, reason);

    await message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> has been unbanned`))
  }
  if (command === "kick") {
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });
      let timeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have already used this command recently\n\nTry again in ${remaining}`);
      message.channel.send(timeEmbed)
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**Command: ${prefix}kick**\n\n**Description**: kicks a member\n**Usage**: ${prefix}kick [user] [reason]\n**Example**: ${prefix}kick @shivaco hurt my feelings\n**Cooldown**: 3 seconds`)


      let reason = args.slice(1).join(' ');
      if (!reason) reason = "No reason provided";

      if (!message.member.hasPermission("ADMINISTRATOR", "KICK_MEMBERS")) return message.channel.send("You need to be an admin to use this command.");

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (member === message.author) return;
      if (!member)
        return message.reply(embed)
      if (!member.kickable)
        return message.reply(embed)

      await member.kick(reason)
        .catch(error => message.reply({ embed: { color: ('RANDOM'), description: (`Sorry ${message.author} I couldn't kick because of : ${error}`) } }));

      message.reply({ embed: { color: ('RANDOM'), description: (`${member} has been kicked succesfully`) } });
      cooldowns.set(message.author.id, Date.now() + 3000)
      setTimeout(() => cooldowns.delete(message.author.id), 3000);
    }
  };

  if (message.content.startsWith(prefix + 'ban')) {
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });
      let timeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have already used this command recently\n\nTry again in ${remaining}`);
      message.channel.send(timeEmbed)
    } else {

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**Command: ${prefix}ban**\n\n**Description**: bans a member\n**Usage**: ${prefix}ban [user] [reason]\n**Example**: ${prefix}ban @shivaco not pog champ\n**Cooldown**: 3 seconds`)


      let reason = args.slice(1).join(' ');
      if (!reason) reason = "No reason provided";

      if (!message.member.hasPermission("ADMINISTRATOR", "BAN_MEMBERS")) return message.channel.send("You need to be an admin to use this command.");

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (member === message.author) return;
      if (!member)
        return message.reply(embed)
      if (!member.bannable)
        return message.reply(embed)

      await member.ban({ days: 7, reason: `${(reason)}` })
        .catch(error => message.reply({ embed: { color: ('RANDOM'), description: (`Sorry ${message.author} I couldn't ban because of : ${error}`) } }));
      message.reply({ embed: { color: ('RANDOM'), description: (`${member} has been banned succesfully`) } });

      cooldowns.set(message.author.id, Date.now() + 3000)
      setTimeout(() => cooldowns.delete(message.author.id), 3000);
    }
  }
  if (command === "clear") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");


    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply({ embed: { color: ('RANDOM'), description: ("Please provide a number between 2 and 100 for the number of messages to delete") } });

    const fetched = await message.channel.messages.fetch({ limit: deleteCount });

    let msgDel = fetched.array().length;
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    message.channel.send({ embed: { color: ('RANDOM'), description: (`Cleared ${msgDel} messages.`) } }).then(message => message.delete({ timeout: 5000 }));
  }
  if (command === "restart") {
    if (!message.author === config.owner2) return;
    const rest = await message.channel.send('Restarting...');
    client.destroy(tokem)
    client.login(tokem)
    rest.edit(`Restarted took: ${Math.round(client.ws.ping)}ms`)
  }

  if (command === "uptime") {
    const uptime = moment.duration(client.uptime).format("[<:MeruYes:952435870491893810> | **Merumu's uptime is**] \`D [days], H [hours], m [minutes], s [seconds]\`");
    message.reply({ embed: { color: ('RANDOM'), description: uptime } });
  }
  if (command === "backup") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.")
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`Backing up your server....`)


    const ok = await message.channel.send(embed)

    backup.create(message.guild, {
      maxMessagesPerChannel: 50,
      jsonSave: true,
      jsonBeautify: true,
      doNotBackup: [],
      saveImages: "base64"
    }).then((backupData) => {

      ok.edit(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Successfully Backed up your discord server!**\n*Want to load it?*\n\n**Just type** \`${prefix}load ${backupData.id}\`\n*Need additional support?*\n\n**[join the support server](https://discord.gg/jDjcA9Y7kU) to get the best support!**`)
      )

    })
  }
  if (command === "load") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need to be an admin or mod to use this command.")
    let backupID = args[0];
    if (!backupID) {
      return message.channel.send("You must specify a valid backup ID!");
    }

    backup.fetch(backupID).then(async () => {
      // If the backup exists, request for confirmation
      let embedd = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Are you sure you want to load this backup?\n*all channels, roles, and emojis will be rest and you will lose all messages ent here*\n\nType \`${prefix}confirm\`to confirm this`)


      message.channel.send(embedd);
      await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === `${prefix}confirm`), {
        max: 1,
        time: 20000,
        errors: ["time"]
      }).catch((err) => {
        // if the author of the commands does not confirm the backup loading
        return message.channel.send("Time's up! Cancelled backup loading!");
      });

      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Loading your server backup....`)


      const oh = await message.channel.send(embed)

      backup.load(backupData, message.guild, {
        clearGuildBeforeRestore: true
      });
      oh.edit(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Loaded the backup!**\n*it has also been removed from the database*`)
      )
    }).catch((err) => {
      // If an error occurred
      return message.author.send("Please check that I have administrator permissions!");
    }).catch((err) => {
      console.log(err);
      // if the backup wasn't found
      return message.channel.send("No backup found for `" + backupID + "`!");
    });
  }
  if (command === "info") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.")

    let backupID = args[0];
    if (!backupID) {
      return message.channel.send("You must specify a valid backup ID!");
    }
    // Fetch the backup
    backup.fetch(backupID).then((backupInfos) => {
      const date = new Date(backupInfos.data.createdTimestamp);
      const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
      const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;
      let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        // Display the backup ID
        .addField("Backup ID", backupInfos.id, false)
        // Displays the server from which this backup comes
        .addField("Server ID", backupInfos.data.guildID, false)
        // Display the size (in mb) of the backup
        .addField("Size", `${backupInfos.size} mb`, false)
        // Display when the backup was created
        .addField("Created at", formatedDate, false)
        .setColor("RANDOM")


      message.channel.send(embed);
    }).catch((err) => {
      return message.channel.send("No backup found for `" + backupID + "`!");
    });
  }
  if (command === "afk") {

    db.set(message.guild.id + `${message.author.id}afk`, 'true')
    db.set(message.guild.id + `${message.guild.id}messageAFK`, args.join(" "))

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`${message.author} you are now afk!`)


    message.channel.send(embed)
  }
  if (command === 'level') {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let level = db.get(`level_${message.guild.id}_${user.id}`) || 0;
    let exp = db.get(`xp_${message.guild.id}_${user.id}`) || 0;
    let neededXP = Math.floor(Math.pow(level / 0.1, 2));

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**〉 Level**: ${level}\n**〉 Xp**: ${exp}\n**〉 Needed xp**: ${neededXP}`)


    if (args[0] === "--card") {

      let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

      let level = db.get(`level_${message.guild.id}_${user.id}`) || 0;
      let exp = db.get(`xp_${message.guild.id}_${user.id}`) || 0;
      let neededXP = Math.floor(Math.pow(level / 0.1, 2));

      let every = db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
      let rank = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${user.id}`) + 1;

      let img2 = 'https://media.discordapp.net/attachments/952662918984499311/952746769459060776/3ed7c553906c5a4de2246e61a5dc33d751b7c804261904bada31d6777e9a6c76_1.png';
      // v4 rank card
      //   let img = await canvacord.rank({
      //     username: user.username,
      //     discrim: user.discriminator,
      //     currentXP: exp.toString(),
      //     neededXP: neededXP.toString(),
      //     rank: rank.toString(),
      //     level: level.toString(),
      //     avatarURL: user.displayAvatarURL({ format: "png" }),
      //     background: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&w=1000&q=80"
      //   });

      // v5 rank card
      const card = new canvacord.Rank()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setRank(rank)
        .setLevel(level)
        .setCurrentXP(exp)
        .setRequiredXP(neededXP)
        .setCustomStatusColor('#ffb5b0')
        .setBackground("IMAGE", img2)
        .setProgressBar("#ffb5b0")
        .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

      const img = await card.build();

      message.channel.send(`${message.author}`)
      return message.channel.send(new Discord.MessageAttachment(img, "level.png"));
    } else {
      message.channel.send(`${message.author}`)
      message.channel.send(embed)
    }
  }
  if (command === "prefix") {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefix: config.prefix
      }
    }
    let prefix = prefixes[message.guild.id].prefix;

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need to be able to manage messages to use this command.");
    if (!args[0]) return message.reply("Please enter a prefix!");

    prefixes[message.guild.id] = {
      prefix: args[0]
    }

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {

      console.log(err)
    });

    let pronfix = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**〉 I have changed the guild prefix to**: ${args[0]}`)



    message.channel.send(pronfix)
  }
  if (command === "avatar") {

    let member = message.mentions.users.first() || message.author;
    message.channel.send(new Discord.MessageEmbed().setColor("RANDOM")
      .setImage(member.displayAvatarURL({ dynamic: true, size: 256 })))
  }

  if (command === "lyrics") {
    
    const { getLyrics } = require('genius-lyrics-api');
    
    let song = args.join(' ').split('|');
    if (!song) return message.channel.send('No song lyrics to search');

     const options = {
	apiKey: config.api,
	title: song,
       artist: song,
	optimizeQuery: true
};

  

    getLyrics(options).then((lyrics) => message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`Lyrics of the Song:\n\n ${lyrics}`)));

  }
  if (command == "play") {
    if (!message.member.voice.channel) return message.channel.send(` You're not in a voice channel !`);
    let song = args.join(' ')
    if (!song) return message.channel.send('plase enter a songs url/name');
    distube.play(message, song);
  }


  if (command === "loop") {
    let mode = distube.setRepeatMode(message, parseInt(args[0]));
    mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`Set looping to \`${mode}\``)
    )
  }

  if (command == "dc") {
    distube.stop(message);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**Destroyed the music player and left the vc!**`)
    )
  }

  if (command == "skip")
    distube.skip(message);

  if (command == "queue") {
    let queue = distube.getQueue(message);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription('**Current queue:**\n' + queue.songs.map((song, id) =>
        `**${id + 1}**. [${song.name}](song.url) - \`${song.formattedDuration}\``
      ).slice(0, 10).join("\n"))
    );
  }

  if (message.content.startsWith([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`])) {
    let filter = distube.setFilter(message);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription("Current queue filter: " + (filter || "Off"))
    )
  }
  if (command === "autoplay") {
    let mode = distube.toggleAutoplay(message);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`")
    )
  }
  if (command === "volume") {
    let vol = args.join(" ")
    distube.setVolume(message, vol);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**Changed the volume to ${vol}%**`)
    )
  }
  if (command === "pause") {
    distube.pause(message);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**Paused the music!**`)
    )
  }
  if (command === "resume") {
    distube.resume(message);
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**Resumed the music!**`)
    )
  }



  if (command === "trigger") {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ format: 'png' });
    let image = await cord.trigger(avatar);
    let attachment = new Discord.MessageAttachment(image, "triggered.gif");
    return message.channel.send(attachment);
  }
  if (command === "trash") {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ format: 'png' });
    let image = await cord.trash(avatar);
    let attachment = new Discord.MessageAttachment(image, "trash.png");
    return message.channel.send(attachment);
  }
  if (command === "gay") {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ format: 'png' });
    let image = await cord.gay(avatar);
    let attachment = new Discord.MessageAttachment(image, "gay.png");
    return message.channel.send(attachment);
  }
  if (command === "invert") {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ format: 'png' });
    let image = await cord.invert(avatar);
    let attachment = new Discord.MessageAttachment(image, "inverted.png");
    return message.channel.send(attachment);
  }
  if (command === "wanted") {
    let member = message.mentions.users.first() || message.author;

    let avatar = membed.displayAvatarURL({ format: 'png' });
    let image = await cord.wanted(avatar);
    let attachment = new Discord.MessageAttachment(image, "wanted.png");
    return message.channel.send(attachment);
  }
  if (command === "beautiful") {
    let member = message.mentions.users.first() || message.author;

    let author = member.displayAvatarURL({ format: 'png' });

    let image = await cord.beautiful(author);

    let attachment = new Discord.MessageAttachment(image, "beautiful.png");
    return message.channel.send(attachment);
  }
  if (command === "facepalm") {
    let member = message.mentions.users.first() || message.author;

    let author = member.displayAvatarURL({ format: 'png' });

    let image = await cord.facepalm(author);

    let attachment = new Discord.MessageAttachment(image, "facepalm.png");
    return message.channel.send(attachment);
  }
  if (command === "delete") {
    let avatar = message.mentions.users.first().displayAvatarURL({ format: 'png' });
    if (!avatar) return message.reply('please mention someone')
    let image = await cord.delete(avatar);

    let attachment = new Discord.MessageAttachment(image, "delete.png");
    return message.channel.send(attachment);
  }
  if (command === "spotify") {
    if (args[0] === "--card") {
      let spotify = message.member.presence.activities.filter(x => x.name == 'Spotify' && x.type == 'LISTENING')[0];
      if (!spotify) return message.reply('user isnt listening to spotify')

      let trackIMG = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(8)}`;
      let trackName = spotify.details;
      let trackAuthor = spotify.state;
      let trackAlbum = spotify.assets.largeText;

      const data = await cord.Spotify({
        title: trackName,
        artist: trackAuthor,
        album: trackAlbum,
        image: trackIMG,
        start: spotify.timestamps.start,
        end: spotify.timestamps.end
      });
      const img = cord.write(data, "spotify.png");

      return message.channel.send(img);
    } else {
      let user = message.mentions.users.first() || message.author;
      let spotify = message.member.presence.activities.filter(x => x.name == 'Spotify' && x.type == 'LISTENING')[0];
      if (spotify) {

        let trackIMG = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(8)}`;
        let trackURL = `https://open.spotify.com/track/${spotify.syncID}`;
        let trackName = spotify.details;
        let trackAuthor = spotify.state;
        let trackAlbum = spotify.assets.largeText;

        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setThumbnail(trackIMG)
          .addField('Song Name', trackName)
          .addField('Album', trackAlbum)
          .addField('Author', trackAuthor)
          .addField('Listen to Track', `${trackURL}`)
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
          .setTimestamp()

        message.channel.send(embed);
      }
    }
  }
  if (command === "ttt") {
    const member = message.mentions.members.first()
    if (!member) return message.channel.send('Please specify a member')

    new tictactoe({
      player_two: member,
      message: message
    })
  }
  if (command === "hangman") {
    hangman.newGame(message);
  }
  if (command === "start-uno") {
    await discordUNO.startGame(message);
  }
  if (command === "join-game") {
    await discordUNO.addUser(message);
  }
  if (command === "leave-game") {
    await discordUNO.removeUser(message);
  }
  if (command === "create-uno") {
    await discordUNO.createGame(message);
  }
  if (command === "close-game") {
    await discordUNO.endGame(message);
  }
  if (command === "play-card") {
    await discordUNO.playCard(message);
  }
  if (command === "uno") {
    await discordUNO.UNO(message);
  }
  if (command === "draw") {
    await discordUNO.draw(message);
  }
  if (command === "cards") {
    await discordUNO.viewCards(message);
  }
  if (command === "table") {
    await discordUNO.viewTable(message);
  }
  if (command === "addrole") {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
    //next we define some variables
    const target = message.mentions.members.first() //member = mentions
    if (!target) return message.channel.send('No member specified') //when no member is pinged
    const role = message.mentions.roles.first() // roles = mentions
    if (!role) return message.channel.send('No role specified') //when no role is specified or pinged
    //now the code!
    await target.roles.add(role) // adding the role to the user
    message.channel.send(`${target.user.username} has obtained ${role}`)
  }
  if (command === "removerole") {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
    //next we define some variables
    const target = message.mentions.members.first() //member = mentions
    if (!target) return message.channel.send('No member specified') //when no member is pinged
    const role = message.mentions.roles.first() // roles = mentions
    if (!role) return message.channel.send('No role specified') //when no role is specified or pinged
    //now the code!
    await target.roles.remove(role) // removeing the role to the user
    message.channel.send(`${target.user.username} roles has been removed from ${role}`)
  }
  if (command === "help") {
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**Merumu is a powerful Moderation x Utility bot, designed by** [Moown](https://github.com/moonieqt)#0001 **and coded in** [discord.js](https://discordjs.guide/) ! **it is mainly a free to use bot to help moderate your community,.**\n*Want to learn more about Merumu? select a menu from the list below*\n \n\n**Basic Category**\n> |  **help 1**  Basic commands\n> |  **help 2**  Leveling commmands\n> |  **help 3**  Economy commands\n\n **Fun Category**\n> |  **help 4**  Image manipulation commands\n> |  **help 5**  Game commands\n\n**Moderating Category**\n> |  **help 6**  Moderator commands\n> |  **help 7**  Antiraid commands\n> |  **help 8**  Automod commands\n\n**Misc Category**\n> |  **help 9**  Utility commands\n> |  **help 10**  Roleplay commands\n> |  **help 11**  Music commands\n\n**Translate Category**\n> |  **help 12** Dictionary Commands\n\n| [invite me](https://discord.com/api/oauth2/authorize?client_id=952422602159317013&permissions=1108373531702&scope=bot) | [Report form](https://forms.gle/MRqX4rv9PrH8dQEf7) | [Vote for me]() | [Support](https://discord.gg/pWxet2b6Fg) |`)

    if (args[0] === "1") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Basic category*\n\n**Basic Commands**:\n> | *setup* : setup your server\n> |  *ticket config [staff only]* : setup ticket command\n> |  *ping* : get bot latency\n> |  *uptime* : get clients uptime\n> |  *shards [owner only]* : get all shards\n> |  *prefix* : changes the guilds prefix\n> |  *stats* : get the bots stats`)


      message.channel.send(embed)
    } else if (args[0] === "2") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Basic category*\n\n**Leveling Commands**:\n> | *level* : sends an embed of your level profile\n> |  *level --card* : sends your level profile as a card\n> |  *r-lb* : shows the rank leaderboard`)


      message.channel.send(embed)
    } else if (args[0] === "3") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Basic category*\n\n**Economy Commands**:\n> |  *bal* : displays your balance\n> |  *work* : work at a career\n> |  *lb* : get the leaderboard\n> |  *gamble* : try gambling some money\n> |  *deposit* : keep your money safe in the bank\n> |  *withdraw* : take some money out of your savings\n> |  *pay* : give someone your money\n\n**Item commands**\n> |  *create-item* : creates an item\n> |  *delete-item* : deletes an item\n> |  *item-info* : get info of an created item\n\n**Shop commands**\n> |  *shop --latest* : get the latest item in the shop\n> |  *shop --item* : see if a item is in stock\n> |  *shop --global* : get the default shop list\n\n**Maketing commands**\n> |  *buy* : buy an item from the shop\n> |  *petshop* : buy a pet from the pet shop!\n> |  *market* : buy weapons from the towns market\n\n**Rank Commmands**\n> |  *rank* : get your first rank\n> |  *upgrade --rank* : upgrade your rank\n\n\n**More commands coming in the future!**`)


      message.channel.send(embed)
    } else if (args[0] === "4") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Fun category*\n\n**Image Manipulation Commands**:\n> | *trigger* : sends a triggered version of your pfp\n> |  *gay* : sends a prideful version of your pfp\n> |  *trash* : sends a trash version of your pfp\n> | *invert* : inverts your pfp\n> |  *wanted* : sends a wanted poster of you\n> |  *beautiful* : sends a beautiful version of you\n> |  *facepalm* : sends a photo of you facepalming\n> |  *delete* : sends a photo of you deleting some trash [mention only]`)


      message.channel.send(embed)
    } else if (args[0] === "5") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Fun category*\n\n**Game Commands**:\n> | *ttt* : starts a tick tac toe game with the mentioned user\n> |  *hangman* : play a game of hangman\n\n**Uno Commands**\n> | *start-uno* : starts your uno game [after its created and more then 2 people are in it]\n> |  *join-game* : joins a game of uno\n> |  *leave-game* : leaves the current game of uno\n> |  *create-uno* : creates a game of uno\n> |  *close-game* : ends the current game of uno\n> | *play-card* : plays a card from your deck\n> |  *uno* : call uno!\n> |  *draw* : draws a card from the deck\n> |  *cards* : dms you the cards you have in your deck\n> |  *table* : sends the game info`)


      message.channel.send(embed)
    } else if (args[0] === "6") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Moderating category*\n\n**Moderator Commands**:\n> | *ban* : bans member from your server\n> |  *kick* : kicks member from your server\n> |  *warn* : warns member\n> |  *unwarn* : unwarn member\n> |  *warnings* : get all warnings for member\n> |  *purge* : purges messages in a text channel\n> |  *addrole* : adds role to mentioned user\n> |  *removerole* : removes role from mentioned user\n> |  *unban* : unbans a banned member\n> |  *silence* : silences the chat command is used in\n> |  *unsilence* : unsilences the chat command is used in\n> |  *mute* : mutes member for time [or perm]\n> |  *unmute* : unmutes muted member`)


      message.channel.send(embed)
    } else if (args[0] === "7") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Moderating category*\n\n**Antiraid Commands**:\n> | *conceal* : hides your server from all members\n> | *reveal* : reveals your server to all members\n> | *underraid* : locks down the WHOLE server [on/off]\n> | *joinban* : bans memebrs as soon as they join [on/off]\n> | *slowmode* : slows down the text channel`)


      message.channel.send(embed)
    } else if (args[0] === "8") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Moderating category*\n\n**Automod Commands**:\n> | *message-spam* : monitors all chats to see if a user is spamming\n> |  *badwords* :  monitors all chats for blacklisted words (auto-configed)\n> |  *invite-links* : monitors all chats for invite links  [on/off]\n> |  *logging* : log all mod actions`)


      message.channel.send(embed)
    } else if (args[0] === "9") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Misc category*\n\n**Utility Commands**:\n> | *ticket* : gives helpful info about the ticket commands and hiw they work\n> |  *create* : creates a ticket\n> |  *close [staff]* : closces a ticket staff\n> |  *backup* : backs up your discord server\n> |  *info* : get infomation on a backup\n> |  *load* : load a backup\n> |  *afk* : sets your afk\n> |  *avatar* : sends your avatar or the person you mentions avatar\n\n**Spotify & Fun Commands**\n> |  *spotify* : displays song playing on spotify\n> |  *spotify --card* : displays spotify song in a card\n> | *8ball* : ask 8  ball a question\n> |  *love* : shows how much you love someone`)


      message.channel.send(embed)
    } else if (args[0] === "10") {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Misc category*\n\n**Roleplay Commands**:\n> | *hug* : hugs mentions user\n> |  *kiss* :  kisses mentioned user\n> |  *slap* : mentioned user\n> |  *poke* : pokes mentioned user\n> |  *smug* : sends a smug gif\n> |  *pat* : pats the mentioned user\n> |  *cry* : sends a crying gif`)


      message.channel.send(embed)
    } else if (args[0] === "11") {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Misc category*\n\n**Music Commands**:\n> |  *play* : plays a song [url/name]\n> |  *loop* : loops a song\n> |  *dc* : disconnects the bot from vc\n> |  *skip* : skips the song playing\n> | *queue* : get the full queue\n> |  *autoplay* : turns autoplaying [on/off] [on by default]\n> |  *volume* : changes the bots music volume\n> |  *pause* : pauses the music\n> |  *resume* : reusmes the music\n> |  *lyrics* : searches up the songs lyrics\nPLease format your search like this \`ex : ${prefix}lyrics blinding lights | the weekend\` or else it won't send anything.\n\n*Tags for music filters*\n**3d | bassboost | echo | karaoke | nightcore | vaporwave**`)


      message.channel.send(embed);
    } else if (args[0] === "12") {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Command Category**\n> | *Translate category*\n\n**Dictionary Commands**:\n> |  *jisho* : searches the japanese dictionary for the word\n> |  *urban* : searches urban dictionary`)


      message.channel.send(embed);
    } else {
      message.channel.send(embed);
    }
  }
  if (command === "stats") {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .addField('❯ Servers', (client.guilds.cache.size), true)
      .addField('❯ Users', (client.users.cache.size), true)
      .addField('❯ Commands', (commands), true)
      .addField('❯ Invite', '[Add me](https://discord.com/api/oauth2/authorize?client_id=782929865636446229&permissions=8&scope=bot)', true)
      .addField('❯ Source Code', '[All Code](https://github.com/moonieqt/Merumu)', true)
      .addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
      .addField('❯ Uptime', moment.duration(client.uptime).format("D [days], H [hours], m [minutes], s [seconds]"), true)
      .addField('❯ Version', `v1.2.0`, true)
      .addField('❯ Node.js', process.version, true)
      .addField('❯ Discord.js', `v^12.5.1`, true)
      .addField('❯ Database', `v13.9.5`, true);
    return message.channel.send(embed);
  }
  if (command === "hug") {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to hug them"); //if no one is mentions , lets reply as
    const { body } = await superagent
      .get("https://nekos.life/api/hug"); //lets see wut we went

    const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
      .setColor("RANDOM") // you can set it as you went
      .setDescription(`UwU, ${message.author} hugged ${message.mentions.users.first()}`) // lets reply like this if we mentions
      .setImage(body.url) // hug gif well showing here
    message.channel.send({ embed })
  }
  if (command === "kiss") {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to kiss them");
    const { body } = await superagent
      .get("https://nekos.life/api/kiss");

    const embed = new Discord.MessageEmbed() //RichEmbed is changed to MessageEmbed because the newest update is remove `RichEmbed` Method
      .setColor("RANDOM") // you can set it random color
      .setDescription(`OwO, ${message.author} kissed ${message.mentions.users.first()}`)
      .setImage(body.url)
    message.channel.send({ embed })
  }
  if (command === "pat") {
    if (!message.mentions.users.first()) return message.reply("you almost mention someone to pat them");
    if (message.mentions.users.first().id === "782929865636446229") return message.channel.send('<:spooked:791196290754412584>');
    const { body } = await superagent
      .get("https://nekos.life/api/pat");

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM") //you can set it as you went
      .setDescription(`${message.author} patted ${message.mentions.users.first()}`) //lets reply as 
      .setImage(body.url) // lets showing pat (GIF}
    message.channel.send({ embed })
  }
  if (command === "poke") {
    if (!message.mentions.users.first()) return message.reply(":x: | i see anything is wrong ,You need to mention someone to pat them"); //lets reply as this if you didnt mention anyone
    if (message.mentions.users.first().id === "782929865636446229") return message.channel.send('<a:kith:790731483576139777>'); //lets reply as this if you mentions
    const { body } = await superagent
      .get("https://nekos.life/api/v2/img/poke"); //lets check wut we need

    const embed = new Discord.MessageEmbed() // RichEmbed is renamed as MessageEmbed onec discordjs is updated to newest version
      .setColor("RANDOM")
      .setDescription(`${message.author} wants ${message.mentions.users.first()} attention`) // lets reply as a funny reply
      .setImage(body.url)
    message.channel.send({ embed })
  }
  if (command === "slap") {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them"); //if no one is mentions , lets reply as
    if (message.mentions.users.first().id === "764418996505804820") return message.reply('you cant slap my master >:c'); //if they mentions you , lets reply as
    const { body } = await superagent
      .get("https://nekos.life/api/v2/img/slap"); //wut we need 

    const embed = new Discord.MessageEmbed() //once discordjs is updated to 12.2.0 , richembed is removed , they replaced as MessageEmbed Method
      .setColor("RANDOM") // you can set it as you went
      .setDescription(`${message.mentions.users.first()} has been slapped by ${message.author}`) //lets reply as a some fun reply
      .setImage(body.url) //lets show slap image (GIF}
    message.channel.send({ embed })
  }
  if (command === "smug") {
    const { body } = await superagent
      .get("https://nekos.life/api/v2/img/smug"); //wut we need

    const embed = new Discord.MessageEmbed() // once discordjs is updated to 12.2.0 , richembed method is renamed to MessageEmbed
      .setTitle('----') // i make it empty , change it as you went
      .setColor("RANDOM") //its personnel , you can change it
      .setImage(body.url) //here well shozing Smug Image
    message.channel.send({ embed })
  }
  if (command === "cry") {
    const { body } = await superagent
      .get("https://neko-love.xyz/api/v1/cry"); //wut we need

    const embed = new Discord.MessageEmbed() // once discordjs is updated to 12.2.0 , richembed method is renamed to MessageEmbed
      .setDescription(`qwq, ${message.author} is crying`) // i make it empty , change it as you went
      .setColor("RANDOM") //its personnel , you can change it
      .setImage(body.url) //here well shozing Smug Image
    message.channel.send({ embed })
  }
  if (command === "silence") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let role = message.guild.roles.cache.get("@everyone")
    channel.updateOverwrite(role, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: true
    });

    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`***Silenced #${message.channel}***`)
    )
  }
  if (command === "unsilence") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");
    let role = message.guild.roles.cache.get("@everyone")
    channel.updateOverwrite(role, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true
    });

    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`***Unsilenced #${message.channel}***`)
    )
  }
  if (command === "mute") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have Permission to mute!");
    let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if (toMute.id === message.author.id) return message.channel.send("You can not mute yourself!");
    if (toMute.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can not mute a member that is equal to or higher than yourself!");

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.cache.find(mR => mR.name === "Muted");

    // If the mentioned user does not have the muted role execute the following
    if (!mutedRole) {
      try {
        // Create a role called "Muted"
        mutedRole = await message.guild.roles.create({ data: { name: 'Muted', color: ('#000001'), permissions: [] } })
        await message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.updateOverwrite(mutedRole, {
            SEND_MESSAGES: false,
            ADD_message: false,
            CONNECT: false
          });
        });
        const why = await message.channel.send(new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Updating channel permissions .  .  .`)
        )

        why.edit(new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Updated all channels!`)
        )

      } catch (e) {
        // If err print
        console.log(e.stack);
      }
    }

    // If the mentioned user already has the "mutedRole" then that can not be muted again
    if (toMute.roles.cache.has(mutedRole.id)) return message.channel.send("This user is already muted!");

    // TODO: Check they they have entered a valid number or even entered one

    // Check current time and add muted time to it, then convert to seconds from milliseconds
    client.muted[toMute.id] = {
      guild: message.guild.id,
      time: Date.now() + parseInt(args[1]) * 1000
    }

    // Add the mentioned user to the "mutedRole" and notify command sender
    await toMute.roles.add(mutedRole);



    fs.writeFile("./muted.json", JSON.stringify(client.muted, null, 4), err => {
      if (err) throw err;

      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**I have Muted ${toMute.user.username} (${toMute.user.id})**`)
      )
    });
  }
  if (command === "unmute") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have Permission to unmute!");
    let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if (toMute.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can not unmute a member that is equal to or higher than yourself!");

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.cache.find(mR => mR.name === "Muted");

    // If the mentioned user or ID does not have the "mutedRole" return a message
    if (!mutedRole || !toMute.roles.cache.has(mutedRole.id)) return message.channel.send("This user is not muted!");

    // Remove the mentioned users role "mutedRole", "muted.json", and notify command sender
    await toMute.roles.remove(mutedRole);

    toMute.roles.remove(mutedRole);
    delete client.muted[toMute.id];

    fs.writeFile("./muted.json", JSON.stringify(client.muted), err => {
      if (err) throw err;
      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**I have Unmuted ${toMute.user.username} (${toMute.user.id})**`)
      )
    });
  }
  if (command === "urban") {
    
    let query = args.join(" ");
     if(!query) return message.channel.send
    ("nothing to search , please inout a word to search love");

    query = encodeURIComponent(query);

    const { 
      data: {list}
      } = await axios.get
            (
              `
                https://api.urbandictionary.com/v0/define?term=${query}
              `
            );
    const [ json ] = list;

    
    
      let urbEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by: ${json.author}`);

      message.channel.send(urbEmbed)
  };
  
  if (command === "8ball") {
    let question = args.join(" ");
    if (!question) "No question asked";
    var response = ["yes", "Most Likely", "Outlook good", "Yes", "Signs point to yes", "Unclear", "Ask again", "No", "Indefinitely"]
    const rpon = Math.floor(Math.random() * (response.length - 1) + 1);
    message.reply(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Your question was:  ${question}`)
      .setDescription(` Your anwser is:    ${(response[rpon])}`))
  }
  if (command === "work") {
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now());
      let timeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have already worked recently\n\nTry again in ${remaining}`);
      message.channel.send(timeEmbed)
    } else {


      let replies = ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic', 'Engineer', 'Hitman', 'Hacker']


      let result = Math.floor((Math.random() * replies.length));
      let amount = Math.floor(Math.random() * 80) + 1;
      let embed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`You worked as a ${replies[result]} and earned ${amount} coins`);
      await message.channel.send(embed1)

      economy.add(`money_${message.guild.id}_${user.id}`, amount)
      economy.set(`work_${message.guild.id}_${user.id}`, Date.now())

      cooldowns.set(message.author.id, Date.now() + 10000)
      setTimeout(() => cooldowns.delete(message.author.id), 10000);
    }
  }
  if (command === "bal") {
    let user = message.mentions.members.first() || message.author;

    let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)

    if (bal === null) bal = 0;

    let bank = await economy.fetch(`bank_${message.guild.id}_${user.id}`)
    if (bank === null) bank = 0;

    let moneyEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
    message.channel.send(moneyEmbed)
  }
  if (command === "beg") {
    let user = message.author;
    let amount = 14;

    let beg = await economy.fetch(`beg_${message.guild.id}_${user.id}`)


    let moneyEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(` You've begged and received ${amount} coins`);
    message.channel.send(moneyEmbed)
    economy.add(`money_${message.guild.id}_${user.id}`, amount)
    economy.set(`beg_${message.guild.id}_${user.id}`, Date.now())
  }
  if (command === "deposit") {
    let user = message.author;

    let member = economy.fetch(`money_${message.guild.id}_${user.id}`)
    let member2 = economy.fetch(`bank_${message.guild.id}_${user.id}`)

    if (args[0] == 'all') {
      let money = await economy.fetch(`money_${message.guild.id}_${user.id}`)
      let bank = await economy.fetch(`bank_${message.guild.id}_${user.id}`)

      let embedbank = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(" You don't have any money to deposit")

      if (money === 0) return message.channel.send(embedbank)

      economy.add(`bank_${message.guild.id}_${user.id}`, money)
      economy.subtract(`money_${message.guild.id}_${user.id}`, money)
      let embed5 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have deposited all your coins into your bank`);
      message.channel.send(embed5)

    } else {

      let embed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` Specify an amount to deposit`);

      if (!args[0]) {
        return message.channel.send(embed2)
          .catch(err)
        console.log(err)
      }
      let embed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You can't deposit negative money`);

      if (message.content.includes('-')) {
        return message.channel.send(embed3)
      }
      let embed4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You don't have that much money`);

      if (member < args[0]) {
        return message.channel.send(embed4)
      }

      let embed5 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have deposited ${args[0]} coins into your bank`);

      message.channel.send(embed5)
      economy.add(`bank_${message.guild.id}_${user.id}`, args[0])
      economy.subtract(`money_${message.guild.id}_${user.id}`, args[0])
    }
  }
  if (command === "pay") {
    let user = message.mentions.members.first()

    let member = economy.fetch(`money_${message.guild.id}_${message.author.id}`)


    if (!user) {
      return message.channel.send('you forgot to mention somebody.')
    }
    if (!args[1]) {
      return message.channel.send('Please specify an amount.')
    }
    if (message.content.includes('-')) { // if the message includes "-" do this.
      return message.channel.send('Negative money can not be paid.')
    }

    if (member < args[1]) {
      return message.channel.send(`That's more money than you've got in your balance. try again.`)
    }

    message.channel.send(`${message.author.tag}, You successfully paid ${user.user.username} ${args[1]}$.`)
    economy.add(`money_${message.guild.id}_${user.id}`, args[1])
    economy.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
  }
  if (command === "gamble") {
    let user = message.author;

    function isOdd(num) {
      if ((num % 2) == 0) return false;
      else if ((num % 2) == 1) return true;
    }

    let colour = args[0];
    let money = parseInt(args[1]);
    let moneydb = await economy.fetch(`money_${message.guild.id}_${user.id}`)

    let random = Math.floor(Math.random() * 37);

    let moneyhelp = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(` Specify an amount to gamble | ${prefix}gamble <color> <amount>`);

    let moneymore = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(` You are betting more than you have`);

    let colorbad = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(` Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour) return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);



    if (random == 0 && colour == 2) { // Green
      money *= 15
      economy.add(`money_${message.guild.id}_${user.id}`, money)
      let moneyEmbed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You won ${money} coins\n\nMultiplier: 15x`);
      message.channel.send(moneyEmbed1)
      console.log(`${message.author.tag} Won ${money} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
      money = parseInt(money * 1.5)
      economy.add(`money_${message.guild.id}_${user.id}`, money)
      let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You won ${money} coins\n\nMultiplier: 1.5x`);
      message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
      money = parseInt(money * 2)
      economy.add(`money_${message.guild.id}_${user.id}`, money)
      let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`You won ${money} coins\n\nMultiplier: 2x`);
      message.channel.send(moneyEmbed3)
    } else { // Wrong
      economy.subtract(`money_${message.guild.id}_${user.id}`, money)
      let moneyEmbed4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You lost ${money} coins\n\nMultiplier: 0x`);
      message.channel.send(moneyEmbed4)
    }
  }
  if (command === "withdraw") {
    let user = message.author; (`money_${message.guild.id}_${message.author.id}`)

    let member = economy.fetch(`money_${message.guild.id}_${user.id}`)
    let member2 = economy.fetch(`bank_${message.guild.id}_${user.id}`)

    if (args[0] == 'all') {
      let money = await economy.fetch(`bank_${message.guild.id}_${user.id}`)

      economy.subtract(`bank_${message.guild.id}_${user.id}`, money)
      economy.add(`money_${message.guild.id}_${user.id}`, money)
      let embed5 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have withdrawn all your coins from your bank`);
      message.channel.send(embed5)

    } else {

      let embed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` Specify an amount to withdraw`);

      if (!args[0]) {
        return message.channel.send(embed2)
      }
      let embed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You can't withdraw negative money`);

      if (message.content.includes('-')) {
        return message.channel.send(embed3)
      }
      let embed4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You don't have that much money in the bank`);

      if (member2 < args[0]) {
        return message.channel.send(embed4)
      }

      let embed5 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` You have withdrawn ${args[0]} coins from your bank`);

      message.channel.send(embed5)
      economy.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
      economy.add(`money_${message.guild.id}_${user.id}`, args[0])
    }
  }

  if (command === "lb") {

    let money = economy.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    let finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i]) + 1}.**     <@${money[i].ID.slice(25)}> - \`${money[i].data} $\`\n`;
    }
    if (!finalLb) finalLb = 'nobody to display on the leaderboard';

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setColor("RANDOM")
      .addField(`Money Leaderboard`, finalLb, false)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed);
  }
  if (command === "r-lb") {

    let level = db.all().filter(data => data.ID.startsWith(`level`)).sort((a, b) => b.data - a.data)
    level.length = 10;
    let finalLb = "";
    for (var i in level) {
      finalLb += `**${level.indexOf(level[i]) + 1}.**     <@${level[i].ID.slice(25)}> - \`Level is: ${level[i].data}\`\n`;
    }
    if (!finalLb) finalLb = 'nobody to display on the leaderboard';

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setColor("RANDOM")
      .addField(`Rank Leaderboard`, finalLb, false)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed);
  }
  if (command === "create-item") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Command: ${prefix}create-item**\n\n**Description**: \`creates item in the shop\`\n**Usage**: \`${prefix}create-item [name] [price] [description]\`\n**Example**: \`${prefix}create-item bow 10 grab a bow to hunt!\`\n**Cooldown**: \`None\``)


    let name = args[0]
    if (!name) return message.channel.send(embed);
    let price = args[1]
    if (!price) price = '0';
    let desc = args.slice(2).join(' ')
    if (!desc) desc = 'No description set';


    economy.set(`item_${name}_${message.guild.id}`, { name: `${name}`, price: `${price}`, description: `${desc}` });

    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`***| Created an item for the shop***\n\n**Item info**\n**Name of the item**: \`${name}\`\n**Price of the item**: \`${price}\`\n**Description of the item**: \`${desc}\``)
    )
  }
  if (command === "delete-item") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Command: ${prefix}delete-item**\n\n**Description**: \`delete item in the shop\`\n**Usage**: \`${prefix}delete-item [name]\`\n**Example**: \`${prefix}delete-item bow\`\n**Cooldown**: \`None\``)


    let name = args[0]
    if (!name) return message.channel.send(embed)
    if (!economy.get(`item_${name}_${message.guild.id}`)) return message.channel.send('no item in the shop with that name');

    economy.delete(`item_${name}_${message.guild.id}`)
    economy.delete(`shop_item_${message.guild.id}`, { name: `${name}` });
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`***| Deleted an item from the shop***\n\n**Item info**\n**Name of the item**: \`${name}\``)
    )
  }
  if (command === "item-info") {
    if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) return message.channel.send("You need to be an admin or mod to use this command.");

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Command: ${prefix}item-info**\n\n**Description**: \`get info of a item in the shop\`\n**Usage**: \`${prefix}item-info [name]\`\n**Example**: \`${prefix}item-info bow\`\n**Cooldown**: \`None\``)


    let name = args[0]
    if (!name) return message.channel.send(embed)
    if (!economy.get(`item_${name}_${message.guild.id}`)) return message.channel.send('no item in the shop with that name');

    let iname = economy.get(`item_${name}_${message.guild.id}.name`)
    let iprice = economy.get(`item_${name}_${message.guild.id}.price`)
    let idesc = economy.get(`item_${name}_${message.guild.id}.description`)
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`***| Info of item from the shop***\n\n**Item info**\n**Name of the item**: \`${iname}\`\n**Price of the item**: \`${iprice}\`\n**Description of the item**: \`${idesc}\``)
    )

  }
  if (command === "shop") {

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Command: ${prefix}shop**\n\n**Description**: \`View the servers shop\`\n**Usage**: \`${prefix}shop\`\n**Example**: \`${prefix}shop\`\n**Cooldown**: \`None\`\n**Sub categorys** \`--latest\`, \`--item\` and \`--global\``)

    if (args[0] === "--latest") {


      let iname = economy.get(`shop_item_${message.guild.id}.name`)
      if (!iname) return message.channel.send('nothing in the shop')
      let iprice = economy.get(`shop_item_${message.guild.id}.price`)
      let idesc = economy.get(`shop_item_${message.guild.id}.description`)


      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setTitle(`Welcome to ${message.guild.name}'s Shop`)
        .setDescription(`Latest items in this servers shop!\n\n*Items display name: \`${iname}\`\nItems current price: \`${iprice}\`\nItems current description: \`${idesc}\`*\n\n`)
      )
    } else if (args[0] === "--item") {
      let name = args[1]
      if (!name) return message.channel.send(embed)
      if (!economy.get(`item_${name}_${message.guild.id}`)) return message.channel.send('no item in the shop with that name');

      let iname = economy.get(`item_${name}_${message.guild.id}.name`)
      let iprice = economy.get(`item_${name}_${message.guild.id}.price`)
      let idesc = economy.get(`item_${name}_${message.guild.id}.description`)
      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setTitle(`Welcome to ${message.guild.name}'s Shop`)
        .setDescription(`**${iname} is currently in stock!**\n\n**Item info**\n**Name of the item**: \`${iname}\`\n**Price of the item**: \`${iprice}\`\n**Description of the item**: \`${idesc}\``)
      )
    } else if (args[0] === "--global") {
      economy.set(`item_Pistol_${message.guild.id}`, { name: `Pistol`, price: `240`, description: `None` });
      economy.set(`item_AK-14_${message.guild.id}`, { name: `AK-14`, price: `340`, description: `None` });
      economy.set(`item_M14_${message.guild.id}`, { name: `M14`, price: `500`, description: `None` });
      economy.set(`item_RPG_${message.guild.id}`, { name: `RPG`, price: `2390`, description: `None` });
      economy.set(`item_ABAT_${message.guild.id}`, { name: `ABAT`, price: `52003`, description: `None` });
      economy.set(`item_Pistol_rounds_${message.guild.id}`, { name: `Pistol_rounds`, price: `30`, description: `None` });
      economy.set(`item_AK_rounds_${message.guild.id}`, { name: `AK_rounds`, price: `56`, description: `None` });
      economy.set(`item_M14_rounds_${message.guild.id}`, { name: `M14_rounds`, price: `120`, description: `None` });
      economy.set(`item_RPG_rounds_${message.guild.id}`, { name: `RPG_rounds`, price: `300`, description: `None` });
      economy.set(`item_ABAT_rounds_${message.guild.id}`, { name: `ABAT_rounds`, price: `4000`, description: `None` });
      economy.set(`item_Kaiou_${message.guild.id}`, { name: `Kaiou`, price: `130`, description: `None` });
      economy.set(`item_Bonzo_${message.guild.id}`, { name: `Bonzo`, price: `330`, description: `None` });
      economy.set(`item_Neiphi_${message.guild.id}`, { name: `Neiphi`, price: `100`, description: `None` });
      economy.set(`item_Bowo_${message.guild.id}`, { name: `Bowo`, price: `1600`, description: `None` });
      economy.set(`item_Chaoi_${message.guild.id}`, { name: `Chaoi`, price: `1020`, description: `None` });
      economy.set(`item_seeds_${message.guild.id}`, { name: `seeds`, price: `10`, description: `None` });
      economy.set(`item_meat_${message.guild.id}`, { name: `meat`, price: `30`, description: `None` });
      economy.set(`item_bait_${message.guild.id}`, { name: `bait`, price: `20`, description: `None` });
      economy.set(`item_rice_${message.guild.id}`, { name: `rice`, price: `60`, description: `None` });
      economy.set(`item_carrots_${message.guild.id}`, { name: `carrot`, price: `100`, description: `None` });
      economy.set(`item_Bronze_${message.guild.id}`, { name: `bronze`, price: `10000`, description: `None` });
      economy.set(`item_BronzeII_${message.guild.id}`, { name: `bronze2`, price: `15000`, description: `None` });
      economy.set(`item_BronzeIII_${message.guild.id}`, { name: `bronze3`, price: `20000`, description: `None` });

      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setTitle(`Welcome to ${message.guild.name}'s Shop`)
        .setDescription(`Merumu's Global Shop Items\n\n**Weapons and Ammo**\n---------------\n| Pistol: \`240$\`\n| Ak-14: \`340\`\n| M14: \`500$\`\n| RPG: \`2390$\`\n| ABAT Catapillar 149: \`52003$\`\n---------------\nPistol rounds: \`30$\`\nAk rounds: \`56$\`\nM14 rounds: \`120$\`\nRPG rockets: \`300$\`\nABAT rounds: \`4000$\`\n\n**Pets and Food**\n---------------\nKaiou: \`130$\`\nBonzo: \`330$\`\nNeiphi: \`100$\`\nBowo:\`1600$\`\nChaoi: \`1020\`\n---------------\nSeeds: \`10$\`\nMeat: \`30$\`\nBait: \`20$\`\nRice: \`60$\`\nGM carrots: \`100$\`\n\n**Badges**\n---------------\nBronze I: \`10000$\`\nBronze II: \`15000$\`\nBronze III: \`20000$\``)
      )
    } else {
      message.channel.send(embed)
    }
  }
  if (command === "inv") {
    let user = message.author || message.mentions.members.first()

    let item = economy.get(`inventory_${user.id}_${message.guild.id}_item.name`)
    if (item === null) item = 'None';
    let consu = economy.get(`inventory_${user.id}_${message.guild.id}_food.name`)
    if (consu === null) consu = 'None';
    let pettu = economy.get(`inventory_${user.id}_${message.guild.id}_pets.name`)
    if (pettu === null) pettu = 'None';
    let wepp = economy.get(`inventory_${user.id}_${message.guild.id}_weapons.name`)
    if (wepp === null) wepp = 'None';
    let box = economy.get(`inventory_${user.id}_${message.guild.id}_boxes.name`)
    if (box === null) box = 'None';
    let cra = economy.get(`inventory_${user.id}_${message.guild.id}_crates.name`)
    if (cra === null) cra = 'None';
    let nic = economy.get(`inventory_${user.id}_${message.guild.id}_ranks.name`)
    if (nic === null) nic = 'None';
    let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
    if (bal === null) bal = '0';
    let bank = economy.fetch(`bank_${message.guild.id}_${user.id}`)
    if (bank === null) bank = '0';

    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setTitle(`Openings ${user.username}'s inventory!`)
      .setDescription(`**Rank**: ${nic}\n---------------------\n\n**Weapons**: ${wepp}\n---------------------\n**Pets**: ${pettu}\n**Food**: ${consu}\n**Items**: ${item}\n\n**Users Balance**\n\n**Pocket**: ${bal}\n**Bank**: ${bank}\n\n**Loot boxes & crates**\n\n**Loot Boxes**: ${box}\n---------------------\n**Crates**: ${cra}`)
    )
  }
  if (command === "buy") {
    let user = message.author;
    let name = args[0]
    if (!name) return message.channel.send('please inter the name of the item you wish to buy')
    if (!economy.get(`item_${name}_${message.guild.id}`)) return message.channel.send('no item in the shop with that name');
    let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
    let pric = economy.fetch(`item_${name}_${message.guild.id}.price`)

    if (bal < pric) {
      message.channel.send('You cannot afford this item')
    }

    if (bal > pric) {

      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`\`${name}\` | *You have successfully brought this item!!*`)
      )

      economy.set(`inventory_${user.id}_${message.guild.id}_item`, { name: `${name}` });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    }


  }
  if (command === "petshop") {
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Please enter the name of the pet you with to buy!\n\n**[ chaoi | bonzo | kaiou | neiphi | bowo ]**')
    if (args[0] === "chaoi") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Chaoi_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('#ffe6e6')
          .setDescription(`**Thank you for buying Chaoi!**`)
          .setImage('https://cdn.discordapp.com/attachments/791459581124542474/791996569657278464/chaoi-removebg-preview.png')

        message.channel.send(embed).then((msg) => {
          msg.react('<:Chaoi:791988931436085248>')
        });
      }

      economy.set(`inventory_${user.id}_${message.guild.id}_pets`, { name: `Chaoi` });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    } else if (args[0] === "kaiou") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Kaiou_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('#e6fffb')
          .setDescription(`**Thank you for buying Kaiou!**`)
          .setImage('https://media.discordapp.net/attachments/791459581124542474/791996543015452672/kaiou__1_-removebg-preview.png?width=600&height=113')

        message.channel.send(embed).then((msg) => {
          msg.react('<:Kaiou:792242484028637196>')
        });
      }

      economy.set(`inventory_${user.id}_${message.guild.id}_pets`, { name: `Kaiou` });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    } else if (args[0] === "bonzo") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Bonzo_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('#c7e0ff')
          .setDescription(`**Thank you for buying Bonzo!**`)
          .setImage('https://media.discordapp.net/attachments/791459581124542474/791997224628125716/bonzo-removebg-preview_1.png?width=600&height=113')

        message.channel.send(embed).then((msg) => {
          msg.react('<:Bonzo:791988154936721449>')
        });
      }

      economy.set(`inventory_${user.id}_${message.guild.id}_pets`, { name: `Bonzo` });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    } else if (args[0] === "neiphi") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Neiphi_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('#b6fcac')
          .setDescription(`**Thank you for buying Neiphi!**`)
          .setImage('https://media.discordapp.net/attachments/791459581124542474/791996550942949406/neiphi-removebg-preview.png?width=600&height=113')

        message.channel.send(embed).then((msg) => {
          msg.react('<:Neiphi:791988224464519168>')
        });
      }
      economy.set(`inventory_${user.id}_${message.guild.id}_pets`, { name: `Neiphi` });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    } else if (args[0] === "bowo") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Bowo_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('#c9acfc')
          .setDescription(`**Thank you for buying Bowo!**`)
          .setImage('https://media.discordapp.net/attachments/791459581124542474/791996541531193394/bowo-removebg-preview.png?width=600&height=113')

        message.channel.send(embed).then((msg) => {
          msg.react('<:Bowo:791988324218044456>')
        });
      }

      economy.set(`inventory_${user.id}_${message.guild.id}_pets`, { name: `Bowo` });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    } else {
      message.channel.send(embed)
    }
  }
  if (command === "market") {
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Please enter the name of the guns or ammo you want to buy!\n\n**[ Pistol | Ak-14 | M14 | RPG | ABAT ]**\n[ Pistol_rounds | Ak_rounds | RPG_rounds | ABAT_rounds]')
    if (args[0] === "Pistol") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Pistol_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased a pistol!**`)

        message.channel.send(embed)
      }
      economy.set(`inventory_${user.id}_${message.guild.id}_weapons`, { name: `Pistol`, ammo: [`15`,], mags: [`1`,] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.set(`gun_${user.id}_${message.guild.id}_pistol`, 1)
    } else if (args[0] === "Ak-14") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_AK_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased a AK-14!**`)

        message.channel.send(embed)
      }
      economy.set(`inventory_${user.id}_${message.guild.id}_weapons`, { name: `AK-14`, ammo: [`24`,], mags: [`1`,] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.set(`gun_${user.id}_${message.guild.id}_ak`, 1)
    } else if (args[0] === "M14") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_M14_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased a M14!**`)

        message.channel.send(embed)
      }
      economy.set(`inventory_${user.id}_${message.guild.id}_weapons`, { name: `M14`, ammo: [`18`,], mags: [`1`,] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.set(`gun_${user.id}_${message.guild.id}_m14`, 1)
    } else if (args[0] === "RPG") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_RPG_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased a RPG :0**`)

        message.channel.send(embed)
      }
      economy.set(`inventory_${user.id}_${message.guild.id}_weapons`, { name: `RPG`, ammo: [`1`,], mags: [`1`,] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.set(`gun_${user.id}_${message.guild.id}_rpg`, 1)
    } else if (args[0] === "ABAT") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_ABAT_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased a ABAT :0**`)

        message.channel.send(embed)
      }
      economy.set(`inventory_${user.id}_${message.guild.id}_weapons`, { name: `ABAT`, ammo: [`5`,], mags: [`1`,] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.set(`gun_${user.id}_${message.guild.id}_abat`, 1)
    } else if (args[0] === "Pistol_rounds") {
      let user = message.author;
      let gun = economy.fetch(`gun_${user.id}_${message.guild.id}_pistol`)
      if (!gun) return message.channel.send('you dont own a pistol')
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_Pistol_rounds_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased ammunition for a pistol!**`)

        message.channel.send(embed)
      }

      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.push(`inventory_${user.id}_${message.guild.id}_weapons.name`, { name: `Pistol`, ammo: `15`, mags: `2` })
    } else if (args[0] === "Ak_rounds") {
      let user = message.author;
      let gun = economy.fetch(`gun_${user.id}_${message.guild.id}_ak`)
      if (!gun) return message.channel.send('you dont own a Ak-14')
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_AK_rounds_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased ammunition for a AK!**`)

        message.channel.send(embed)
      }
      conomy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.push(`inventory_${user.id}_${message.guild.id}_weapons.name`, { name: `AK-14`, ammo: `24`, mags: `2` })
    } else if (args[0] === "M14_rounds") {
      let user = message.author;
      let gun = economy.fetch(`gun_${user.id}_${message.guild.id}_m14`)
      if (!gun) return message.channel.send('you dont own a M14')
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_M14_rounds_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased ammunition for a m14!**`)

        message.channel.send(embed)
      }
      conomy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.push(`inventory_${user.id}_${message.guild.id}_weapons.name`, { name: `M14`, ammo: `18`, mags: `2` })
    } else if (args[0] === "RPG_rounds") {
      let user = message.author;
      let gun = economy.fetch(`gun_${user.id}_${message.guild.id}_rpg`)
      if (!gun) return message.channel.send('you dont own a RPG')
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_RPG_rounds_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased rockets for a RPG :0**`)

        message.channel.send(embed)
      }
      conomy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.push(`inventory_${user.id}_${message.guild.id}_weapons.name`, { name: `RPG`, ammo: `1`, mags: `2` })
    } else if (args[0] === "ABAT_rounds") {
      let user = message.author;
      let gun = economy.fetch(`gun_${user.id}_${message.guild.id}_abat`)
      if (!gun) return message.channel.send('you dont own a ABAT')
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_ABAT_rounds_${message.guild.id}.price`)
      if (bal < pric) {
        message.channel.send('You cannot afford this item')
      }

      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**Purchased ammunition for a ABAT :0**`)

        message.channel.send(embed)
      }
      conomy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.push(`inventory_${user.id}_${message.guild.id}_weapons.name`, { name: `ABAT`, ammo: `4`, mags: `2` })
    } else {
      message.channel.send(embed);
    }
  }
  if (command === "rank") {
    let user = message.author;
    let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
    let pric = economy.fetch(`item_Bronze_${message.guild.id}.price`)
    if (bal < pric) {
      message.channel.send('You cannot afford this rank')
    }
    if (bal > pric) {
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**You are now rank \`Bronze I\`**`)

      message.channel.send(embed)
    }
    economy.set(`inventory_${user.id}_${message.guild.id}_ranks`, { name: [`Bronze I`,] });
    economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    economy.set(`rank_${user.id}_${message.guild.id}_bronze`)
  }
  if (command === "upgrade") {
    if (args[0] === "--rank") {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_BronzeII_${message.guild.id}.price`)
      let hm = economy.get(`rank_${user.id}_${message.guild.id}_bronze`)
      if (!hm) return message.channel.send('you do not have the first rank, in order to upgrade your rank you must have a co-existing rank alraedy in your name.')
      if (bal < pric) {
        message.channel.send('You cannot afford this rank')
      }
      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**You are now rank \`Bronze II\`**`)

        message.channel.send(embed)
      }
      economy.push(`inventory_${user.id}_${message.guild.id}_ranks`, { name: [`Bronze I`, `Bronze II`,] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
      economy.set(`rank_${user.id}_${message.guild.id}_bronzeII`)
    } else {
      let user = message.author;
      let bal = economy.fetch(`money_${message.guild.id}_${user.id}`)
      let pric = economy.fetch(`item_BronzeIII_${message.guild.id}.price`)
      let hm = economy.get(`rank_${user.id}_${message.guild.id}_bronzeII`)
      if (!hm) return message.channel.send('you do not have the second rank, in order to upgrade again you must purchase it first')
      if (bal < pric) {
        message.channel.send('You cannot afford this rank')
      }
      if (bal > pric) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**You are now rank \`Bronze III\`**`)

        message.channel.send(embed)
      }
      economy.push(`inventory_${user.id}_${message.guild.id}_ranks`, { name: [`Bronze I`, `Bronze II`, `Bronze III`] });
      economy.subtract(`money_${message.guild.id}_${user.id}`, pric)
    }
  }

  if (command === "love") {
    let person = message.mentions.members.first();
    let person2 = message.author;
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    message.channel.send(new Discord.MessageEmbed()
      .setColor("#ffb6c1")
      .setDescription(`How much does ${person2} love ${person}?`)
      .addField(`☁ **${message.author.displayName}** loves **${person.displayName}** this much:`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`))
  }
  if (command === "jisho") {
    let msg = message;
    let word = args.join(' ');
    try {
      const { body } = await request
        .get('http://jisho.org/api/v1/search/words')
        .query({ keyword: word });
      if (!body.data.length) return msg.channel.send('Could not find any results.');
      const data = body.data[0];
      return msg.channel.send(stripIndents`
				**${data.japanese[0].word || data.japanese[0].reading}**
				${data.senses[0].english_definitions.join(', ')}
			`);
    } catch (err) {
      return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
});
client.login(tokem);