import { Permissions, MessageEmbed } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;


  export default {
    data: {
      name: 'whitelist',
      description: 'Configures the whitelist feature.',
      options: [
        {
              name: 'set',
              description: 'Sets the whitelist feature configurations.',
              type: 'SUB_COMMAND_GROUP',
              options: [
                {
                  name: 'roles',
                  description: 'Sets the whitelist role',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'add-r',
                      description: 'adds the whitelisted role',
                      type: 'ROLE',
                      required: false
                    },
                    {
                      name: 'remove-r',
                      description: 'removes the whitelisted role',
                      type: 'ROLE',
                      required: false
                    }
                  ]
            }
          ]
        },
            {
              name: 'show',
              description: 'Shows the currnt whitelisted menu and roles.',
              type: 'SUB_COMMAND'
            }
          ]
        },
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    async execute(client, interaction) {
      const onEmbed = new MessageEmbed()
  .setColor(0x57cf23)
  .setDescription(`**> ${client.emotes} | __Welcome to Merumu Whitelisting [ BETA v.1 ]__**\n\n  __**What is this?**__\n*Merumu whitelisting is where you can [ add, remove, view ] all your whitelisted roles for automod and antiraid anywhere in your server by runnning this command*\n\n  __**What is Automod?**__\n*automod is the automoderation feature included with the bot to take some of the work of your staff's back. some of its features include logging, badwords filter, message spam, invitelinks and more!*\n\n  __**What is antiraid?**__\n*The antiraid feature also included with the bot is to help your server out during a raid. some of its features are close where if you are updating the server close with close it off so nobody can read text channels unless you manually enable it or underraid which locks your entire server down!*\n\n  __**Want to add a role to whitelisting or to a spesific category?**__\nType the commands  \`\`\`${client.prefix}whitelist set role:role-a [role id]\`\`\`  \n  __**Want to delete a whitelisted role or roles?**__\nType the commands  \`\`\`${client.prefix}whitelist set role:role-r [role id]\`\`\` `);
      const subcommandGroup = interaction.options.getSubcommandGroup(false);
      const subcommand = interaction.options.getSubcommand();
  
      if (subcommandGroup === 'set') {
        if (subcommand === 'roles') {

  
        if (!interaction.member.permissions.any([ADMINISTRATOR, MANAGE_MESSAGES])) {
          await interaction.reply({
            content: 'You need to be an admin or a mod to use this command.',
            ephemeral: true
          });
    
          return;
        }
        const rolee = interaction.options.getRole('add-r');
        const role = interaction.options.getRole('remove-r');
  
        if(rolee) {
  
          const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(client.emotes + ` | You have Configured the whitelisting role, the role ${rolee.toString()} has been added to whitelisting `)
interaction.reply({ embeds: [embed]})
    
    
          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { whitelistbw: rolee.id } }
          );

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { whitelistin: rolee.id } }
          );

        }else if (role) {

          const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(client.emotes + ` | You have Configured the whitelisting role, the role ${role.toString()} has been deleted from whitelisting `)
interaction.reply({ embeds: [embed]})
  
          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $delete : { whitelistbw: role.id } }
          );

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $delete : { whitelistin: role.id } }
          );
    
          
  
        }
       }
       } else if(subcommand === "show"){
        const { whitelistbw } =
        await client.db.updateGuild(interaction.guild.id)

        

         const embed = new MessageEmbed()
         .setColor('RANDOM')
         .addField('Roles Currently Whitelisted', `<@${whitelistbw}>`)

            interaction.reply({ embeds: [onEmbed] })
            interaction.reply({ embeds: [embed] })
        }
  
        } 
      }
        