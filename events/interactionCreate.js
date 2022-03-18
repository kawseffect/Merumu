export default {
  name: 'interactionCreate',
  once: false,
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Interaction} interaction
   */
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (command === undefined) return;

    try {
      await command.execute(client, interaction);
    } catch (err) {
      console.error(
        `An error occured while executing the '${interaction.commandName}' command:`,
        err
      );
    }
  }
};
