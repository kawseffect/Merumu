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
  async addWarning(guildId, userId, d, reason, issuer) {
    let guild = await this.updateGuild(guildId);

    guild = guild.userWarnings.some((warning) => warning.id === userId)
      ? await this.updateGuild(
          guildId,
          { id: guildId },
          {
            $push: {
              'userWarnings.$[id].warnings': {
                $each: [{ d, reason, issuer }]
              }
            },
            $set: { lastUser: userId }
          },
          {
            arrayFilters: [{ 'id.id': userId }],
            returnDocument: 'after'
          }
        )
      : await this.updateGuild(
          guildId,
          { id: guildId },
          {
            $push: {
              userWarnings: {
                $each: [{ id: userId, warnings: [{ d, reason, issuer }] }]
              }
            },
            $set: { lastUser: userId }
          },
          { returnDocument: 'after' }
        );

    return guild.userWarnings
      .find((warning) => warning.id === userId)
      .warnings.reduce((all, val) => all + val.points, 0);
  }

  async getWarnings(guildId, userId, pos) {
    const guild = await this.updateGuild(guildId);

    const { warnings } = guild.userWarnings.find(
      (warning) => warning.id === userId
    );

    return pos != undefined ? warnings[pos] : warnings;
  }

  async removeWarning(guildId, userId, pos) {
    const guild = await this.updateGuild(guildId);

    let warnings = guild.userWarnings.find((warning) => warning.id === userId);

    if (warnings === undefined) return userId;

    ({ warnings } = warnings);

    const warning = warnings[pos];

    if (warning === undefined) return userId;

    await this.updateGuild(
      guildId,
      { id: guildId },
      {
        $set: {
          [`userWarnings.$[id].warnings.${pos}`]: null
        }
      },
      {
        arrayFilters: [{ 'id.id': userId }]
      }
    );
    await this.updateGuild(
      guildId,
      { id: guildId },
      {
        $pull: {
          [`userWarnings.$[id].warnings.${pos}`]: null
        }
      },
      {
        arrayFilters: [{ 'id.id': userId }]
      }
    );

    return userId;
  }
}
