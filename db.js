import { MongoClient } from 'mongodb';
import { readFileSync } from 'node:fs';

const { mongodbUri } = JSON.parse(readFileSync('./config.json', 'utf-8'));

export default class db {
  constructor() {
    this.db = new MongoClient(mongodbUri);
  }

  async connect() {
    await this.db.connect();

    this.db = this.db.db('merumu');
  }

  async updateGuild(guildId, ...args) {
    const guilds = this.db.collection('guilds');

    let guild = await guilds.findOne({ id: guildId });

    if (guild === null) {
      await guilds.insertOne({
        id: guildId,
        userWarnings: [],
        lastUser: null
      });

      guild = await guilds.findOne({ id: guildId });
    }

    if (args.length === 0) return guild;

    return await guilds.findOneAndUpdate(...args);
  }

  /**
   * @returns {number} The user's new total warning point value.
   */
  async addWarning(guild, user, d, reason, issuer) {
    let guild = await this.updateGuild(guild);

    guild = guild.userWarnings.some((warning) => warning.id === user)
      ? await this.updateGuild(
          guild,
          { id: guild },
          {
            $push: {
              'userWarnings.$[id].warnings': {
                $each: [{ d, reason, issuer }]
              }
            },
            $set: { lastUser: user }
          },
          {
            arrayFilters: [{ 'id.id': user }],
            returnDocument: 'after'
          }
        )
      : await this.updateGuild(
          guild,
          { id: guild },
          {
            $push: {
              userWarnings: {
                $each: [{ id: user, warnings: [{ d, reason, issuer }] }]
              }
            },
            $set: { lastUser: user }
          },
          { returnDocument: 'after' }
        );

    return guild.userWarnings
      .find((warning) => warning.id === user)
      .warnings.reduce((all, val) => all + val.points, 0);
  }

  async getWarnings(guild, user, pos) {
    const guild = await this.updateGuild(guild);

    const { warnings } = guild.userWarnings.find(
      (warning) => warning.id === user
    );

    return pos != undefined ? warnings[pos] : warnings;
  }

  async removeWarning(guild, user, pos) {
    const guild = await this.updateGuild(guild);

    let warnings = guild.userWarnings.find((warning) => warning.id === user);

    if (warnings === undefined) return user;

    ({ warnings } = warnings);

    const warning = warnings[pos];

    if (warning === undefined) return user;

    await this.updateGuild(
      guild,
      { id: guild },
      {
        $set: {
          [`userWarnings.$[id].warnings.${pos}`]: null
        }
      },
      {
        arrayFilters: [{ 'id.id': user }]
      }
    );
    await this.updateGuild(
      guild,
      { id: guild },
      {
        $pull: {
          [`userWarnings.$[id].warnings.${pos}`]: null
        }
      },
      {
        arrayFilters: [{ 'id.id': user }]
      }
    );

    return user;
  }
}
