module.exports.execute = (client, guild) => {
  if (client.storage.get(`guilds.${guild.id}.blacklisted`) === true) return guild.leave();
};

module.exports.type = 'guildCreate';