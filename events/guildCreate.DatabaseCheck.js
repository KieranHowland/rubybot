const mongoose = require('mongoose');

const schemas = require('../schemas');
const Guild = mongoose.model('guild', schemas.Guild);

module.exports.execute = (client, guild) => {
  Guild.findById(guild.id, (err, guild) => {
    if (err) return;

    if (!guild) Guild.create({
      _id: guild.id
    }, (err) => {
      if (err) return;
      return;
    });

    return;
  });
};

module.exports.type = 'guildCreate';