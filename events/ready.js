export default {
  name: 'ready',
  once: true,
  async execute(client) {
    await client.db.connect();

    await client.application.commands.set(
      client.commands.map((command) => command.data)
    );

    setInterval(async () => {
      const mutes_ = client.db.db.collection('mutes');
      const mutes = await mutes_.find().toArray();

      for (const mute of mutes) {
        if (Date.now() > mute.time) continue;

        const guild = client.guilds.cache.get(mute.guildId);

        if (guild === undefined) {
          await mutes_.deleteMany({ guildId: mute.guildId });

          continue;
        }

        const muteRole = guild.roles.cache.find(
          (role) => role.name.toLowerCase() === 'muted'
        );

        if (muteRole === undefined) {
          await mutes_.deleteOne({
            guildId: mute.guildId,
            userId: mute.userId
          });

          continue;
        }

        const member = await guild.members.fetch(mute.userId).catch(() => null);

        if (member === null) {
          await mutes_.deleteOne({
            guildId: mute.guildId,
            userId: mute.userId
          });

          continue;
        }

        await member.roles.remove(muteRole).catch(() => undefined);

        await mutes_.deleteOne({ guildId: mute.guildId, userId: mute.userId });
      }
    }, 10000);

    await client.user.setActivity({ name: '/ commands', type: 'WATCHING' });

    console.log(`Logged in as ${client.user.tag}`);
  }
};
