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
    const { lockdownRole } = await client.db.updateGuild(interaction.guild.id);

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

        if (enable) {
          await interaction.reply({ embeds: [onEmbed] });

          await client.db.updateGuild(
            interaction.guild.id,
            { id: interaction.guild.id },
            { $set: { raidLock: 'Enabled | <:MeruYes:952435870491893810> ' } }
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
            { $set: { raidLock: 'Deactivated | <:MeruNo:952435833649106964>' } }
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
