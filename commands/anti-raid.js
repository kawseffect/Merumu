import { Permissions, MessageEmbed, Formatters } from 'discord.js';

const {
  FLAGS: { ADMINISTRATOR, MANAGE_MESSAGES }
} = Permissions;
const { bold, italic, codeBlock, quote } = Formatters;

const onEmbed = new MessageEmbed()
  .setColor(0x57cf23)
  .setDescription(
    `<:MeruYes:952435870491893810> | ${bold(
      italic('Enabled the Anti-Server-Raiding feature!')
    )}\n\n${bold('What is the anti-raid feature?')}\n${italic(
      'The anti-raid features are custom commands built to help prevent raids from taking place and stop them right on their tracks, from closing the entire server so no one can speak to join-bans to instantly ban users on join!'
    )}\n\n${bold('Want to turn this feature off?')}\n${codeBlock(
      'txt',
      '/auto-raid set mode:off'
    )}`
  );
const offEmbed = new MessageEmbed()
  .setColor(0xff3636)
  .setDescription(
    `<:MeruNo:952435833649106964> | ${bold(
      italic('Disabled the Anti-Server-Raiding feature!')
    )}\n\n${bold('What is the anti-raid feature?')}\n${italic(
      'The anti-raid features are custom commands built to help prevent raids from taking place and stop them right on their tracks, from closing the entire server so no one can speak to join-bans to instantly ban users on join!'
    )}\n\n${bold('Want to turn this feature on?')}\n${codeBlock(
      'txt',
      '/auto-raid set mode:off'
    )}`
  );
const offStr = 'Deactivated | <:MeruNo:952435833649106964>';

export default {
  data: {
    name: 'auto-raid',
    description: 'Configures the anti-raid feature.',
    options: [
      {
        name: 'set',
        description: 'Sets the anti-raid feature configurations.',
        type: 'SUB_COMMAND_GROUP',
        options: [
          {
            name: 'mode',
            description: 'Sets the anti-raid mode.',
            type: 'SUB_COMMAND',
            options: [
              {
                name: 'mode',
                description: 'The anti-raid feature mode.',
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
            name: 'role',
            description: 'Sets the anti-raid role.',
            type: 'SUB_COMMAND',
            options: [
              {
                name: 'role',
                description: 'The anti-raid role.',
                type: 'ROLE',
                required: true
              }
            ]
          }
        ]
      },
      {
        name: 'show',
        description: 'Shows the currnt auto-raid feature mode.',
        type: 'SUB_COMMAND'
      }
    ]
  },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {
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

        const enable = interaction.options.getString('mode') === 'on';

        await client.db.updateGuild(
          interaction.guild.id,
          { id: interaction.guild.id },
          { $set: { autoRaid: enable } }
        );

        await interaction.reply({ embeds: [enable ? onEmbed : offEmbed] });
      } else if (subcommand === 'role') {
        const role = interaction.options.getRole('role');

        await client.db.updateGuild(
          interaction.guild.id,
          { id: interaction.guild.id },
          { $set: { lockdownRole: role.id } }
        );

        const embed = new MessageEmbed()
          .setColor(0x57cf23)
          .setDescription(
            `<:MeruYes:952435870491893810> | The lockdown role has successfully been set to ${role.toString()}`
          );

        await interaction.reply({ embeds: [embed] });
      }
    } else if (subcommand === 'show') {
      const { antiRaid, raidClose, raidUnder, raidJoin, raidSlow } =
        await client.db.updateGuild(interaction.guild.id);

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(
          `${quote(
            bold(italic(`The Anti-Raid is currently ${antiRaid ?? offStr}`))
          )}\n\n${quote(bold(italic('The Anti-Raid features:')))}\n${italic(
            'close/open, under-raid, join-ban, slowmode, and lock/unlock'
          )}\n\n${quote(
            bold(italic('The Anti-Raid feature statuses:'))
          )}\n${bold(
            `Concealed mode is currently ${raidClose ?? offStr}`
          )}\n${bold(
            `Under-raid mode is currently ${raidUnder ?? offStr}`
          )}\n${bold(
            `Join-ban mode is currently ${raidJoin ?? offStr}`
          )}\n${bold(
            `Slowmode feature is currently ${raidSlow ?? offStr}`
          )}\n${italic(
            'If you want to enable any of these features just do'
          )}\n${codeBlock(
            'txt',
            '/<feature> set mode:on/off'
          )}\nTo switch between modes!\n${italic(
            'Want to enable the anti-raid feature?'
          )}\nUse\n${codeBlock(
            'txt',
            '/anti-raid set mode mode:on/off'
          )}\nTo toggle it on or off!\n${quote(
            bold(italic('New feature!'))
          )}\nUse\n${codeBlock(
            'txt',
            '/anti-raid set role role:@role'
          )}\nTo set the default role for your members!\n\n${quote(
            bold(italic('What is this for?'))
          )}\n${italic(
            'This feature is so that if you have an auto-role bot enabled whatever your default member role is (e.g. Members, New Friends, etc etc), this role will be locked down during a raid!'
          )}`
        );

      await interaction.reply({ embeds: [embed] });
    }
  }
};
