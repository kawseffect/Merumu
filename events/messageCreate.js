import { MessageEmbed } from 'discord.js';

const users = new Map();

const LIMIT = 20;
const TIME = 25_000;
const DIFF = 9_500;

const blacklistedWords = [
  'fuck',
  'pussy',
  'bitch',
  'hoe',
  'whore',
  'slut',
  'cunt',
  'piss',
  'shit',
  'damn',
  'nigga',
  'nigger',
  'retard',
  'dickhead',
  'dipshit',
  'ass',
  'asshat',
  'motherfucker',
  'bitchass',
  'bitch ass'
];

const inviteHosts = [
  'discord.gg/',
  'discord.com/invite/',
  'discord.io/',
  'discord.st/'
];

export default {
  name: 'messageCreate',
  once: false,
  async execute(client, message) {
    if (message.author.bot) return;

    if (users.has(message.author.id))
      mod: {
        const { moderate } = await client.db.updateGuild(message.guild.id);

        if (!moderate) break mod;

        const userData = users.get(message.author.id);
        const difference =
          message.createdTimestamp - userData.lastMessageTimestamp;

        if (difference > DIFF) {
          clearTimeout(userData.timer);

          userData.messageCount = 1;
          userData.lastMessageTimestamp = message.createdTimestamp;
          userData.timer = setTimeout(() => {
            users.delete(message.author.id);
          }, TIME)[Symbol.toPrimitive]();

          users.set(message.author.id, userData);
        }

        if (++userData.messageCount === LIMIT) {
          const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
              '<:MeruNo:952435833649106964> | Please do not spam, this is your warning message. If you continue to spam you will be muted for 20 minutes, if you spam again you will be banned.'
            );

          await message.reply({ embeds: [embed] });

          const userData_ = users.get(message.author.id);

          if (userData_.isWarned)
            muteUser: {
              let role = message.guild.roles.cache.find(
                (role_) => role_.name.toLowerCase() === 'muted'
              );

              if (role === undefined)
                createRole: {
                  role = await message.guild.roles
                    .create({
                      name: 'Muted',
                      color: 0x000,
                      permissions: []
                    })
                    .catch(() => null);

                  if (role === null) break createRole;

                  for (const channel of message.guild.channels.cache.values())
                    await channel.permissionOverwrites
                      .edit(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                      })
                      .catch(() => null);
                }

              if (role === null) break muteUser;

              const muted = await message.member.roles
                .add(role)
                .catch(() => null);

              if (muted === null) break muteUser;

              const embed_ = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(
                  'You have been muted for 20 minutes for spamming, this is your final warning after this you will be muted indefinately or until staff has unmuted you.'
                );

              await message.reply({ embeds: [embed_] });

              setTimeout(async () => {
                const unmuted = await message.member.roles
                  .remove(role)
                  .catch(() => null);

                if (unmuted === null) return;

                const embed__ = new MessageEmbed()
                  .setColor('RANDOM')
                  .setDescription(
                    'Your 20 minute mute is up, next time you will be muted indefinatly, until staff deal with you.'
                  );

                await message
                  .reply({ embeds: [embed__] })
                  .catch(() => undefined);
              }, 1_200_000);
            }
        } else users.set(message.author.id, userData);
      }
    else {
      const timer = setTimeout(() => {
        users.delete(message.author.id);
      }, 1_000_000)[Symbol.toPrimitive]();

      users.set(message.author.id, {
        messageCount: 1,
        lastMessageTimestamp: message.createdTimestamp,
        timer
      });
    }

    const xp_ = client.db.db.collection('xp');
    let xp = await xp_.findOne({
      guildId: message.guild.id,
      userId: message.author.id
    });

    if (xp === null) {
      await xp_.insertOne({
        guildId: message.guild.id,
        userId: message.author.id,
        xp: 1,
        level: 1
      });

      xp = await xp_.findOne({
        guildId: message.guild.id,
        userId: message.author.id
      });
    } else
      xp = await xp_.findOneAndUpdate(
        {
          guildId: message.guild.id,
          userId: message.author.id
        },
        { $inc: { xp: 1 } },
        { returnDocument: 'after' }
      );

    const level = Math.floor(0.3 * Math.sqrt(xp.xp));

    if (level > xp.level) {
      await xp_.updateOne(
        { guildId: message.guild.id, userId: message.author.id },
        { $set: { level } }
      );

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(
          `${message.author.toString()}, you just advanced to level ${level}. Congrats!`
        );

      await message.channel.send({ embeds: [embed] });
    }

    const afk_ = client.db.db.collection('afk');

    for (const user of message.mentions.users.values()) {
      if (user.id === message.author.id) continue;

      const afk = await afk_.findOne({
        guildId: message.guild.id,
        userId: message.author.id
      });

      if (afk === null) continue;

      const reason = afk.reason ?? 'No reason given.';

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL({ format: 'png' })
        })
        .setDescription(`${user.toString()} is AFK for: ${reason}`);

      await message.reply({ embeds: [embed] });
    }

    const userAfk = await afk_.findOne({
      guildId: message.guild.id,
      userId: message.author.id
    });

    if (userAfk !== null) {
      await afk_.deleteOne({
        guildId: message.guild.id,
        userId: message.author.id
      });

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL({ format: 'png' })
        })
        .setDescription(
          `${message.author.toString()} welcome back, I have removed your AFK.`
        );

      await message.reply({ embeds: [embed] });
    }

    const settings = await client.db.updateGuild(message.guild.id);

    const lowerContent = message.content.toLowerCase();

    if (
      settings.modBadWords &&
      blacklistedWords.some((word) => lowerContent.includes(word)) &&
      !message.member.roles.cache.has(settings.whitelistbw)
    )
      modBadWords: {
        const deleted = await message.delete().catch(() => null);

        if (deleted === null) break modBadWords;

        const embed = new MessageEmbed()
          .setColor(0xff3636)
          .setDescription(
            '<:MeruNo:952435833649106964> | Badword Detected:\n**Cuss words are not permitted on this server**\nContact a moderator or admin to disable this feature or give you the whitelisted role.'
          );

        const message_ = await message.channel.send({ embeds: [embed] });

        setTimeout(async () => {
          await message_.delete().catch(() => undefined);
        }, 5_000);
      }

    if (
      settings.modInviteLinks &&
      inviteHosts.some((host) => lowerContent.includes(host)) &&
      !message.member.roles.cache.has(settings.whitelistin)
    )
      modInviteLinks: {
        const deleted = await message.delete().catch(() => null);

        if (deleted === null) break modInviteLinks;

        const embed = new MessageEmbed()
          .setColor(0xff3636)
          .setDescription(
            '<:MeruNo:952435833649106964> | Link Deleted:\n**Invite links are not permitted on this server**\n\nContact a moderator or admin to disable this feature or give you the whitelisted role.'
          );

        const message_ = await message.channel.send({ embeds: [embed] });

        setTimeout(async () => {
          await message_.delete().catch(() => undefined);
        }, 5_000);
      }
  }
};
