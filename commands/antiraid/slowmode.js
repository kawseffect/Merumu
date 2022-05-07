import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock } = Formatters;

export default {
  data: {
    name: 'slowmode',
    description: 'Configures the slowmode feature.',
    options: [
      {
        name: 'set',
        description: 'Sets the slowmode feature configurations.',
        type: 'SUB_COMMAND_GROUP',
        options: [
          {
            name: 'mode',
            description: 'Sets the slowmode mode.',
            type: 'SUB_COMMAND',
            options: [
              {
                name: 'mode',
                description: 'The slowmode feature mode.',
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
          italic('Enabled the Slowmode feature!')
        )}\n\n${bold('What is the slowmode feature?')}\n${italic(
          'The slowmode feature is part of the anti-raid commands and category, this command slows down the text channel with the specified amount of seconds'
        )}\n\n${bold('Want to turn this feature off?')}\n${codeBlock(
          'txt',
          '/slowmode set mode:off'
        )}`
      );
    const offEmbed = new MessageEmbed()
      .setColor(0xff3636)
      .setDescription(
        `${client.emotes} | ${bold(
          italic('Disabled the Slowmode feature!')
        )}\n\n${bold('What is the slowmode feature?')}\n${italic(
          'The slowmode feature is part of the anti-raid commands and category, this command slows down the text channel with the specified amount of seconds'
        )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
          'txt',
          '/slowmode set mode:on'
        )}`
      );

    const subcommandGroup = interaction.options.getSubcommandGroup(false);
    const subcommand = interaction.options.getSubcommand();

    if (subcommandGroup === 'set') {
      if (subcommand === 'mode') {
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

        const { antiRaid } = await client.db.updateGuild(interaction.guild.id);

        if (!antiRaid) {
          const embed = new MessageEmbed()
            .setColor(0xff3636)
            .setDescription(
              client.emotes +
                '| Please enable the antiraid feature first before using this command!'
            );

          await interaction.reply({ embeds: [embed] });

          return;
        }

        if (enable) {
          const duration = interaction.options.getInteger('duration');

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { raidSlow: 'Enabled' } }
          );

          const ok = await interaction.channel
            .setRateLimitPerUser(duration)
            .catch(() => null);

          if (ok === null) return;

          await interaction.reply({ embeds: [onEmbed] });
        } else if (!enable) {
          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { raidSlow: 'Deactivated' } }
          );

          const ok = await interaction.channel
            .setRateLimitPerUser(0)
            .catch(() => null);

          if (ok === null) return;

          await interaction.reply({ embeds: [offEmbed] });
        }
      }
    }
  }
};
