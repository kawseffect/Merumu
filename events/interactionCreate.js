export default {
  name: 'interactionCreate',
  once: false,
  async execute(client, interaction) {
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
