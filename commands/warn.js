import { Permissions } from 'discord.js';
import moment from 'moment';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;


  export default {
    data: {
      name: 'warn',
      description: 'Configures the warning feature.',
      options: [
          {
              type: 'SUB_COMMAND',
              name: 'add',
              description: 'adds warning to the user',
              options: [
                  {
                      name: 'user',
                      type: 'USER',
                      description: 'the user to add a warning to',
                      required: true
                  },
                  {
                      name: 'reason',
                      type: 'STRING',
                      description: 'reason for warning them',
                      required: false
                  },
              ],
          },
          {
              type: 'SUB_COMMAND',
              name: 'remove',
              description: 'removes warning from a user',
              options: [
                {
                  name: 'user',
                  type: 'USER',
                  description: 'the user to remove a warning from',
                  required: true
              },
              {
                name: 'num',
                type: 'STRING',
                description: 'the warnings number to remove it from the user',
                required: true
            }
              ]
          },
          {
            type: 'SUB_COMMAND',
            name: 'list',
            description: 'lists the users warnings',
            options: [
              {
                name: 'user',
                type: 'USER',
                description: 'the user to list all warning',
                required: true
            }
            ]
          }
      ]
    },
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    async execute(client, interaction, args) {
        let d = moment().format('lll');
    
        if (
            !interaction.member.permissions.any([ADMINISTRATOR, MANAGE_MESSAGES])
          ) {
            await interaction.reply({
              content: 'You need to be an admin or a mod to use this command.',
              ephemeral: true
            });
  
            return;
          }

          const subCommand = interaction.options.getSubcommand()
          const userId = interaction.options.getUser('user')
          const reason = interaction.options.getString('reason')
          const issuer = interaction.author.id;
          const guildId = interaction.guild.id;

          if(subCommand === "add") {
            client.db.addWarning(guildId, userId, d, reason, issuer)

            interaction.reply({ embed: { color: ('#ff3636'), description: (client.emotes + ` ***<@${userId.id}> (${userId.id}) has been warned***`) } });
          }else if(subCommand === "remove") {
              const argss = interaction.options.getString('num');

            let warningNum = (argss)
            client.db.removeWarning(guildId, userId, warningNum)
            interaction.reply({
                embed: {
                  color: `#ff3636`,
                  description: client.emotes + `***<@${userId.id}> (${userId.id}) has been unwarned***`
                }
              })
                .catch(() => {
                  interaction.reply({
                    embed: {
                      color: `#ff3636`,
                      description: `<:meruconfused:964600025474797578>  Failed to remove warning... Double check the user and warning number. (e.x: /warn remove @user warnNumber)`
                    }
                  });
                });
          } else if(subCommand === "list") {
            var userid = (interaction.mentions.members.first()) || interaction.author;
            var page = (args[2]) ? args[2] : "1";

            if (!isNaN(page)) {
                page = parseInt(page) - 1;
                client.db.getWarnings(interaction.guild.id, userid)
                  .then(warnings => {
                    if (warnings.length == 0) return interaction.reply("", {
                      embed: {
                        color: `#ff3636`,
                        description: client.emotes + " | User has no warnings."
                      }
                    });
                    var array_chunks = Array(Math.ceil(warnings.length / 15)).fill().map((_, index) => index * 15).map(begin => warnings.slice(begin, begin + 15));
                    if (page > -1 && array_chunks.length > page) {
                      interaction.reply({
                        embed: {
                          color: `#ff3636`,
                          description: client.emotes + `  Warnings for <@${userid.id}>  (${userid.id})**\n\n Total warnings:  ${warnings.length} | Page: ${page + 1}/${array_chunks.length}\n\n${array_chunks[page].map((warning, index) => `${index + 1})‎ Timestamp: ${warning.d}‎ | Moderator: <@${warning.issuer}>\n *Reason for the warning: ${warning.reason}*`).join("\n\n")}`
                        }
                      });
                    }
                  });
                }
          }
  
        }
  
        } 