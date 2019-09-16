const mongoose = require('mongoose');

const schemas = require('../schemas');
const User = mongoose.model('user', schemas.User);

module.exports.execute = (client, member) => {
  User.findById(member.user.id, (err, user) => {
    if (err) return;

    if (!user) User.create({
      _id: guild.id
    }, (err) => {
      if (err) return;
      return;
    });

    if (member.user.username !== user.names.pop().username) user.update({
      $push: {
        names: {
          username: member.user.username,
          changed: Date.now()
        }
      }
    }, (err) => {
      if (err) return;
      return;
    });
  });
};

module.exports.type = 'guildMemberAss';