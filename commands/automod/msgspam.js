import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock } = Formatters;

export default {
  data: {
    name: 'msgspam',
    description: 'Configures the message spam feature.',
    options: [
      {
        name: 'set',
        description: 'Sets the message spam feature configurations.',
        type: 'SUB_COMMAND_GROUP',
        options: [
          {
            name: 'mode',
            description: 'Sets the message spam mode.',
            type: 'SUB_COMMAND',
            options: [
              {
                name: 'mode',
                description: 'The message spam feature mode.',
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
          italic('Enabled the Message Spam feature!')
        )}\n\n${bold('What is the message spam feature?')}\n${italic(
          'The message feature is part of the auto-mod commands and category, this command enables the bot to read messages and mutes the user based on the muterole provided'
        )}\n\n${bold('Want to turn this feature off?')}\n${codeBlock(
          'txt',
          '/msgspam set mode:off'
        )}`
      );
    const offEmbed = new MessageEmbed()
      .setColor(0xff3636)
      .setDescription(
        `${client.emotes} | ${bold(
          italic('Disabled the Message Spam feature!')
        )}\n\n${bold('What is the message spam feature?')}\n${italic(
          'The message feature is part of the auto-mod commands and category, this command enables the bot to read messages and mutes the user based on the muterole provided'
        )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
          'txt',
          '/msgspam set mode:on'
        )}`
      );

    const subcommandGroup = interaction.options.getSubcommandGroup(false);
    const subcommand = interaction.options.getSubcommand();

    if (subcommandGroup === 'set') {
      if (subcommand === 'mode') {
        const { automod } = await client.db.updateGuild(interaction.guild.id);

        if (!automod) {
          const embed = new MessageEmbed()
            .setColor(0xff3636)
            .setDescription(
              client.emotes +
                '| Please enable the automod feature first before using this command!'
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
            { $set: { modSpam: 'On' } }
          );
        } else {
          await interaction.reply({ embeds: [offEmbed] });

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { modSpam: 'Off' } }
          );
        }
      }
    }
  }
};
