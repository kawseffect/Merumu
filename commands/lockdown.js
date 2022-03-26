import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock } = Formatters;

const onEmbed = new MessageEmbed()
  .setColor(0x57cf23)
  .setDescription(
    `<:MeruYes:952435870491893810> | ${bold(
      italic('Enabled the Lockdown feature!')
    )}\n\n${bold('What is the lockdown feature?')}\n${italic(
      'The lockdown feature is part of the anti-raid commands and category, this command locks down the text channel so no [member] has message perms'
    )}\n\n${bold('Want to turn this feature off?')}\n${codeBlock(
      'txt',
      '/lockdown set mode:off'
    )}`
  );
const offEmbed = new MessageEmbed()
  .setColor(0xff3636)
  .setDescription(
    `<:MeruNo:952435833649106964> | ${bold(
      italic('Disabled the Lockdown feature!')
    )}\n\n${bold('What is the lockdown feature?')}\n${italic(
        'The lockdown feature is part of the anti-raid commands and category, this command locks down the text channel so no [member] has message perms'
    )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
      'txt',
      '/lockdown set mode:on'
    )}`
  );


  export default {
    data: {
      name: 'lockdown',
      description: 'Configures the lockdown feature.',
      options: [
        {
          name: 'enable',
          description: 'Enables the lockdown feature.',
          type: 'SUB_COMMAND'
        },
        {
          name: 'disable',
          description: 'Disables the lockdown feature.',
          type: 'SUB_COMMAND'
        }
      ]
    },
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    async execute(client, interaction) {
      const { role } = await client.db.updateGuild(interaction.guild.id);

      if (!interaction.member.permissions.any([ADMINISTRATOR, MANAGE_MESSAGES])) {
        await interaction.reply({
          content: 'You need to be an admin or a mod to use this command.',
          ephemeral: true
        });
  
        return;
      }
  
      const subcommand = interaction.options.getSubcommand();
  
      if (subcommand === 'enable') {
        const { antiRaid } = await client.db.updateGuild(interaction.guild.id);
  
        if (!antiRaid) {
          const embed = new MessageEmbed()
            .setColor(0xff3636)
            .setDescription(
              '<:MeruNo:952435833649106964> | Please enable the antiraid feature first before using this command!'
            );
  
          await interaction.reply({ embeds: [embed] });
  
          return;
        }
  
        await client.db.updateGuild(
          interaction.guild.id,
          { id: interaction.guild.id },
          { $set: { raidLock: 'On | <:MeruYes:952435870491893810> ' } }
        );
  
        const ok = await interaction.channel.permissionOverwrites.create(role, {
          SEND_MESSAGES: false
        })
          
          .catch(() => null);
  
        if (ok === null) return;
  
        await interaction.reply({ embeds: [onEmbed] });
      } else if (subcommand === 'disable') {
        await client.db.updateGuild(
          interaction.guild.id,
          { id: interaction.guild.id },
          { $set: { raidLock: 'Off | <:MeruNo:952435833649106964>' } }
        );
  
        
        const ok = await interaction.channel.permissionOverwrites.create(role, {
          SEND_MESSAGES: true
        })
        .catch(() => null);

      if (ok === null) return;


        await interaction.reply({ embeds: [offEmbed] });
      }
    }
  }
