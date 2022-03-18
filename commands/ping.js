import { MessageEmbed, Formatters } from 'discord.js';

const { bold } = Formatters;

export default {
  data: { name: 'ping', description: 'Pong!' },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const embed = new MessageEmbed().setColor('RANDOM').setDescription('Ping?');

    const reply = await interaction.reply({
      embeds: [embed],
      fetchReply: true
    });

    let perf = performance.now();

    await client.db.collection('ping').findOne();

    perf = performance.now() - perf;

    const embed_ = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({
          dynamic: true,
          format: 'png'
        })
      })
      .setDescription(
        `${bold('Message latency')}\n<:online:952437416352964699> ${
          reply.createdTimestamp - interaction.createdTimestamp
        }ms\n${bold('API latency')}\n<:online:952437416352964699> ${Math.floor(
          client.ws.ping
        )}ms\n${bold(
          'Database latency'
        )}\n<:online:952437416352964699> ${Math.floor(perf)}ms`
      )
      .setFooter({ text: 'Pong command info' })
      .setTimestamp();

    await reply.edit({ embeds: [embed_] });
  }
};
