import { Client, Intents, Collection } from 'discord.js';
import Database from './db.js';
import dotenv from 'dotenv';
import { readdirSync, existsSync } from 'node:fs';
import ascii from 'ascii-table';

dotenv.config();

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

const commandFolders = readdirSync('./commands');

if (existsSync('./commands/')) {
  const table = new ascii().setHeading('Commands', 'Load Status');

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter((file) =>
      file.endsWith('.js')
    );

    for (const file of commandFiles) {
      const { default: command } = await import(`./commands/${folder}/${file}`);

      client.commands.set(command.data.name, command);

      table.addRow(file, '✔️');
    }
  }
  console.log(table.toString());
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
