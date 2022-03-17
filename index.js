import { Client, Intents, Collection } from 'discord.js';
import { existsSync, readdirSync } from 'node:fs';
import Database from './db.js';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.db = new Database();
client.commands = new Collection();

if (existsSync('./commands')) {
  const files = readdirSync('./commands');

  for (const file of files) {
    const { default: command } = await import(`./commands/${file}`);

    client.commands.set(command.name, command);
  }
}

if (existsSync('./events')) {
  const files = readdirSync('./events');

  for (const file of files) {
    const { default: event } = await import(`./events/${file}`);

    client[event.once ? 'once' : 'on'](
      event.name,
      event.execute.bind(null, client)
    );
  }
}

await client.login(process.env.token);
