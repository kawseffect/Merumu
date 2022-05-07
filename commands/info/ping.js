import { MessageEmbed } from 'discord.js';

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

    await client.db.db.collection('ping').findOne();

    perf = performance.now() - perf;

    const ping = Math.round(client.ws.ping);
    const ping2 = reply.createdTimestamp - interaction.createdTimestamp;
    const ping22 = Math.floor(perf);

    const emoji =
      ping > 100
        ? '<:yellow:957107445514264646>'
        : '<:online:952437416352964699>';
    const emoji2 =
      ping2 > 100
        ? '<:yellow:957107445514264646>'
        : '<:online:952437416352964699>';
    const emoji22 =
      ping22 > 100
        ? '<:yellow:957107445514264646>'
        : '<:online:952437416352964699>';

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
        `**Websocket**
        ${emoji} ${ping} ms
        **Database** 
        ${emoji22} ${ping22} ms
        **Message**
        ${emoji2} ${ping2} ms
        `
      )
      .setFooter({ text: 'Pong command info' })
      .setTimestamp();

    await reply.edit({ embeds: [embed_] });
  }
};
