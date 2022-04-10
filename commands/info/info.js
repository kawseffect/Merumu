import { MessageEmbed} from 'discord.js';


export default {
  data: { name: 'info', description: 'INfo!' },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const embed = new MessageEmbed().setColor('RANDOM').setDescription('Getting info...');

    const reply = await interaction.reply({
      embeds: [embed],
      fetchReply: true
    });


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
            `**Bot Name: **Meru \n**Owner: **Moown \n**Total Categories: **3 \n**Total Commands: **${client.commands.size} \n**Users:** ${
              client.users.cache.size
            } \n**Servers:** ${client.guilds.cache.size} \n**Channels:** ${
              client.channels.cache.size
            }`
          )
      .setFooter({ text: 'bot info' })
      .setTimestamp();

    await reply.edit({ embeds: [embed_] });
  }
};