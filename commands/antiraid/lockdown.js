import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock } = Formatters;

export default {
  data: {
    name: 'lockdown',
    description: 'Configures the lockdown feature.',
    options: [
      {
        name: 'set',
        description: 'Sets the lockdown feature configurations.',
        type: 'SUB_COMMAND_GROUP',
        options: [
          {
            name: 'mode',
            description: 'Sets the lockdown mode.',
            type: 'SUB_COMMAND',
            options: [
              {
                name: 'mode',
                description: 'The lockdown feature mode.',
                type: 'STRING',
                choices: [
                  {
                    name: 'on',
                    value: 'on'
                  },
                  {
                    name: 'off',
                    value: 'off'
                  }
                ],
                required: true
              }
            ]
          }
        ]
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
      .setDescription(
        `${client.emotes} | ${bold(
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
        `${client.emotes} | ${bold(
          italic('Disabled the Lockdown feature!')
        )}\n\n${bold('What is the lockdown feature?')}\n${italic(
          'The lockdown feature is part of the anti-raid commands and category, this command locks down the text channel so no [member] has message perms'
        )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
          'txt',
          '/lockdown set mode:on'
        )}`
      );

    const { lockdownRole } = await client.db.updateGuild(interaction.guild.id);

    const subcommandGroup = interaction.options.getSubcommandGroup(false);
    const subcommand = interaction.options.getSubcommand();

    if (subcommandGroup === 'set') {
      if (subcommand === 'mode') {
        const { antiraid } = await client.db.updateGuild(interaction.guild.id);
        if (!antiraid) {
          const embed = new MessageEmbed()
            .setColor(0xff3636)
            .setDescription(
              client.emotes +
                '| Please enable the antiraid feature first before using this command!'
            );

          await interaction.reply({ embeds: [embed] });

          return;
        }

        if (
          !interaction.member.permissions.any([ADMINISTRATOR, MANAGE_MESSAGES])
        ) {
          await interaction.reply({
            content: 'You need to be an admin or a mod to use this command.',
            ephemeral: true
          });

          return;
        }

        if (
          !interaction.member.permissions.any([ADMINISTRATOR, MANAGE_MESSAGES])
        ) {
          await interaction.reply({
            content: 'You need to be an admin or a mod to use this command.',
            ephemeral: true
          });

          return;
        }
        const enable = interaction.options.getString('mode') === 'on';

        if (enable) {
          await interaction.reply({ embeds: [onEmbed] });

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { raidLock: 'Enabled' } }
          );

          const ok = await interaction.channel.permissionOverwrites
            .create(lockdownRole, { SEND_MESSAGES: false })
            .catch((error) => {
              console.log(error);
            })

            .catch(() => null);

          if (ok === null) return;
        } else if (!enable) {
          await interaction.reply({ embeds: [offEmbed] });

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { raidLock: 'Deactivated' } }
          );

          const ok = await interaction.channel.permissionOverwrites
            .create(lockdownRole, { SEND_MESSAGES: true })
            .catch((error) => {
              console.log(error);
            })
            .catch(() => null);

          if (ok === null) return;
        }
      }
    }
  }
};
