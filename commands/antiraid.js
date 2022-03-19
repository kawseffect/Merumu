import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock, quote } = Formatters;

const onEmbed = new MessageEmbed()
  .setColor(0x57cf23)
  .setDescription(
    `<:MeruYes:952435870491893810> | ${bold(
      italic('Enabled the Anti-Raid feature!')
    )}\n\n${bold('What is the antiraid feature?')}\n${italic(
      "The anti-raid features are custom commands built to help stop raids right in there tracks from closing the entire server so no one can speak, to joinbans to instantly ban users on join!      "
    )}\n\n${bold('Want to turn this feature off?')}\n${codeBlock(
      'txt',
      '/antiraid set mode:off'
    )}`
  );
const offEmbed = new MessageEmbed()
  .setColor(0xff3636)
  .setDescription(
    `<:MeruNo:952435833649106964> | ${bold(
      italic('Disabled the Anti-raid feature!')
    )}\n\n${bold('What is the antiraid feature?')}\n${italic(
      "The anti-raid features are custom commands built to help stop raids right in there tracks from closing the entire server so no one can speak, to joinbans to instantly ban users on join!      "
    )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
      'txt',
      '/antiraid set mode:on'
    )}`
  );
const offStr = 'Off | <:MeruNo:952435833649106964>';

export default {
  data: {
    name: 'anti-raid',
    description: 'Enables/Disables the antiraid features.',
    options: [
      {
        name: 'set',
        description: 'Sets the anti-raid mode.',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'mode',
            description: 'The anti-raid mode.',
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
        description: 'Shows the current anti-raid feature mode.',
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
        { $set: { antiraid: enable } }
      );

      await interaction.reply({ embeds: [enable ? onEmbed : offEmbed] });
    } else {
      const { antiraid, raidHide, raidSlow, raidUnder, raidBan } =
        await client.db.updateGuild(interaction.guild.id);

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(
          `${quote(
            bold(
              italic(
                `The Anti-Raid feature is currently set to ${
                  antiraid ?? offStr
                }`
              )
            )
          )}\n\n${quote(bold(italic('The antiraid features:')))}\n${italic(
            'badwords, message-spam and invite-links'
          )}\n\n${quote(bold(italic('Feature statuses:')))}\n${bold(
            `Concealed mode is currently set to ${raidHide ?? offStr}`
          )}\n${bold(
            `Joinban mode is currently set to ${raidBan ?? offStr}`
          )}\n${bold(
            `Slowmode is currently set to ${raidSlow ?? offStr}`
          )}\n${bold(
            `Underraid mode is currently set to ${raidUnder ?? offStr}`
          )}\n\n${italic(
            'If you want to enable any of the features just do'
          )}\n${codeBlock(
            'txt',
            '/<feature> set mode:on/off'
          )}\nTo switch between modes!\n${italic(
            'Want to enable antiraid?'
          )} Use\n${codeBlock(
            'txt',
            '/antiraid set mode:on/off'
          )}\nTo toggle it on or off!`
        );

      await interaction.reply({ embeds: [embed] });
    }
  }
};
