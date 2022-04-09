import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock } = Formatters;

const onEmbed = new MessageEmbed()
  .setColor(0x57cf23)
  .setDescription(
    `<:MeruYes:952435870491893810> | ${bold(
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
    `<:MeruNo:952435833649106964> | ${bold(
      italic('Disabled the Slowmode feature!')
    )}\n\n${bold('What is the slowmode feature?')}\n${italic(
      'The slowmode feature is part of the anti-raid commands and category, this command slows down the text channel with the specified amount of seconds'
    )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
      'txt',
      '/slowmode set mode:on'
    )}`
  );

export default {
  data: {
    name: 'slowmode',
    description: 'Configures the slowmode feature.',
    options: [
      {
        name: 'enable',
        description: 'Enables the slowmode feature.',
        type: 'SUB_COMMAND'
      },
      {
        name: 'disable',
        description: 'Disables the slowmode feature.',
        type: 'SUB_COMMAND'
      }
    ]
  },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {
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

      const duration = interaction.options.getInteger('duration');

      await client.db.updateGuild(
        interaction.guild.id,
        { id: interaction.guild.id },
        { $set: { raidSlow: 'Enabled | <:MeruYes:952435870491893810>' } }
      );

      const ok = await interaction.channel
        .setRateLimitPerUser(duration)
        .catch(() => null);

      if (ok === null) return;

      await interaction.reply({ embeds: [onEmbed] });
    } else if (subcommand === 'disable') {
      await client.db.updateGuild(
        interaction.guild.id,
        { id: interaction.guild.id },
        { $set: { raidSlow: 'Deactivated | <:MeruNo:952435833649106964>' } }
      );

      const ok = await interaction.channel
        .setRateLimitPerUser(0)
        .catch(() => null);

      if (ok === null) return;

      await interaction.reply({ embeds: [offEmbed] });
    }
  }
};
