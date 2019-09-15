const fs = require('fs');

module.exports.execute = (client, message) => {
  if (!message.parsed.args) return message.channel.send({
    embed: {
      'title': 'Argument error',
      'description': `\`${message.content}\` is missing required arguments, please try again.`,
      'color': 8912896,
      'footer': {
        'text': `${message.author.username} (${message.author.id})`
      }
    }
  });

  switch (message.parsed.args[0].toLowerCase()) {
    case ('default'):
      return require(`${__dirname}/settings/default`).execute(client, message);
    case ('set'):
      return require(`${__dirname}/settings/set`).execute(client, message);
    case ('view'):
      return require('`${__dirname}/settings/view').execute(client, message);
    default:
      return message.channel.send({
        embed: {
          'title': 'Argument error',
          'description': `\`${message.parsed.args[9]}\` isn't a valid argument, please try again.`,
          'color': 8912896,
          'footer': {
            'text': `${message.author.username} (${message.author.id})`
          }
        }
      });
  };
};

module.exports.meta = {
  name: 'settings',
  usage: '<alias> <set/default/view> <setting> [value]',
  aliases: ['settings', 'preferences'],
  description: 'A utility for server administrators to change server settings',
  permission: 1
};