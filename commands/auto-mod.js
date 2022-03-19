import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock, quote } = Formatters;

const onEmbed = new MessageEmbed()
  .setColor(0x57cf23)
  .setDescription(
    `<:MeruYes:952435870491893810> | ${bold(
      italic('Enabled the Auto-Moderation feature!')
    )}\n\n${bold('What is the auto-mod feature?')}\n${italic(
      "The auto-mod feature is a command for moderators so they don't have to moderate everything and take a little weight off their backs!"
    )}\n\n${bold('Want to turn this feature off?')}\n${codeBlock(
      'txt',
      '/auto-mod set mode:off'
    )}`
  );
const offEmbed = new MessageEmbed()
  .setColor(0xff3636)
  .setDescription(
    `<:MeruNo:952435833649106964> | ${bold(
      italic('Disabled the Auto-Moderation feature!')
    )}\n\n${bold('What is the auto-mod feature?')}\n${italic(
      "The auto-mod feature is a command for moderators so they don't have to moderate everything and take a little weight off their backs!"
    )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
      'txt',
      '/auto-mod set mode:on'
    )}`
  );
const offStr = 'Off | <:MeruNo:952435833649106964>';

export default {
  data: {
    name: 'auto-mod',
    description: 'Configures the auto-mod features.',
    options: [
      {
        name: 'set',
        description: 'Sets the auto-mod mode.',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'mode',
            description: 'The auto-mod mode.',
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
      },
      {
        name: 'show',
        description: 'Shows the current auto-mod feature mode.',
        type: 'SUB_COMMAND'
      }
    ]
  },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'set') {
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

      await client.db.updateGuild(
        interaction.guild.id,
        { id: interaction.guild.id },
        { $set: { automod: enable } }
      );

      await interaction.reply({ embeds: [enable ? onEmbed : offEmbed] });
    } else {
      const { automod, modSpam, modInvite, modBadWord, modLogging } =
        await client.db.updateGuild(interaction.guild.id);

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(
          `${quote(
            bold(
              italic(
                `The Auto-Moderation feature is currently set to ${
                  automod ?? offStr
                }`
              )
            )
          )}\n\n${quote(bold(italic('The auto-mod features:')))}\n${italic(
            'badwords, message-spam and invite-links'
          )}\n\n${quote(bold(italic('Feature statuses:')))}\n${bold(
            `Message spam filter is currently set to ${modSpam ?? offStr}`
          )}\n${bold(
            `Moderation logging is currently set to ${modLogging ?? offStr}`
          )}\n${bold(
            `Invite links filter is currently set to ${modInvite ?? offStr}`
          )}\n${bold(
            `Badwords filter is currently set to ${modBadWord ?? offStr}`
          )}\n\n${italic(
            'If you want to enable any of the features just do'
          )}\n${codeBlock(
            'txt',
            '/<feature> set mode:on/off'
          )}\nTo switch between modes!\n${italic(
            'Want to enable automod?'
          )} Use\n${codeBlock(
            'txt',
            '/auto-mod set mode:on/off'
          )}\nTo toggle it on or off!`
        );

      await interaction.reply({ embeds: [embed] });
    }
  }
};
