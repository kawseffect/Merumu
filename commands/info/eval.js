import { MessageEmbed, Formatters } from 'discord.js';
import { Type } from '@sapphire/type';
import { inspect } from 'node:util';

const { codeBlock } = Formatters;

export default {
  data: {
    name: 'eval',
    description: 'evals inputted code',
    options: [
      {
        name: 'code',
        description: 'type a code to execute',
        type: 3,
        required: true
      }
    ]
  },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (!client.owner.includes(interaction.member.user.id)) {
      const embed = new MessageEmbed()
        .setTitle('EVAL')
        .setColor('RANDOM')
        .setDescription(
          "❌ You dont have perms to use this command. Only Owner's can use this command"
        )
        .setThumbnail(
          interaction.user.displayAvatarURL({ dynamic: true, format: 'png' })
        );

      await interaction.reply({
        embeds: [embed]
      });

      return;
    }

    const toEval = interaction.options.getString('code');

    let timer = performance.now(),
      type_,
      evaluated;

    try {
      evaluated = eval(toEval);

      if (evaluated instanceof Promise) evaluated = await evaluated;

      timer = performance.now() - timer;

      if (typeof evaluated !== 'string')
        evaluated = inspect(evaluated, { depth: 0 });

      if (evaluated.length > 4_000) evaluated = evaluated.slice(0, 4_000);
    } catch (err) {
      evaluated = inspect(err, { depth: 0 });
      timer = performance.now() - timer;
    }

    timer = Math.floor(timer);
    type_ = new Type(evaluated).toString();

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Evaluated in ${timer} ms`)
      .setDescription(codeBlock('js', evaluated))
      .addField('Type', codeBlock('ts', type_))
      .setThumbnail(
        interaction.user.displayAvatarURL({ dynamic: true, format: 'png' })
      );

    await interaction.reply({ embeds: [embed] });
  }
};
