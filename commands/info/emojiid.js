import { MessageEmbed} from 'discord.js';


export default {
  data: { name: 'ping', description: 'Pong!' },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction, message, args) {
    const embed = new MessageEmbed().setColor('RANDOM').setDescription('geting emoji id...');
    const name = args.join(" ");
    const emoji = message.guild.emojis.cache.find((r) => r.name === name);

    if (!name) {
      return message.channel.send("Please type the emoji name");
    }
    if (!emoji) {
      return message.channel.send(
        "Couldn't find the Emojis with the provided name. Please make sure the Emoji name is correct"
      );
    }

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
        `
        Emoji : ${emoji}
        `
      )
      .setFooter({ text: 'Pong command info' })
      .setTimestamp();

    await reply.edit({ embeds: [embed_] });
  }
};