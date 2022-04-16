import { MessageEmbed} from 'discord.js';


export default {
  data: 
  { 
      name: 'eval', 
    description: 'evals imputted code',
    options: [{

        name: "code",
        description: "type a code to execute",
        type: 3,
        required: true

}],
   },
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(client, interaction) {


    const nembed = new MessageEmbed()
    .setTitle("EVAL").setColor("RANDOM")
    .setDescription("❌ You dont have perms to use this command. Only Owner's can use this command")
    .setThumbnail(interaction.member.user.displayAvatarURL())
    

if (!client.owner.includes(interaction.member.user.id)) return interaction.followUp({
    embeds: [nembed]
});

let toEval = interaction.options.getString("code")


    const embed = new MessageEmbed()
        .setTitle("EVAL").setColor("RANDOM")
        .setDescription("❌ Error: `Cannot evaluate nothing`")
        .setThumbnail(interaction.member.user.displayAvatarURL())
        
    let evaluated = eval(toEval, {
        depth: 0
    });

    if (!toEval) return interaction.reply({
        embeds: [embed]
    })
    
    const embed1 = new MessageEmbed()
        .setTitle("EVAL").setColor("RANDOM")
        .setDescription("❌ Error: `Request is too long.`")
        .setThumbnail(interaction.member.user.displayAvatarURL())
        

    if (evaluated.length > 1950) return interaction.reply({
        embeds: [embed1]
    })

    const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Evaluated in ${Math.round(client.ws.ping)}ms`)
        .addField(":inbox_tray: Input", `\`\`\`js\n${toEval}\n\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${evaluated}\n\`\`\``)
        .addField('Type', `\`\`\`xl\n${(typeof evaluated).substr(0, 1).toUpperCase() + (typeof evaluated).substr(1)}\n\`\`\``)
        
        .setThumbnail(interaction.member.user.displayAvatarURL())
        
    interaction.reply({
        embeds: [embed2]
    });

}
}