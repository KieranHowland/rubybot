module.exports.execute = (client, message) => {
  if (!message.parsed.args[0]) return message.channel.send({
    embed: {
      'title': 'Argument error',
      'description': `\`${message.content}\` is missing required arguments, please try again.`,
      'color': 8912896,
      'footer': {
        'text': `${message.author.username} (${message.author.id})`
      }
    }
  });

  if (!client.storage.has(`guilds.${message.parsed.args[0]}`)) client.storage.set(`guilds.${message.parsed.args[0]}`, {
    blacklisted: false,
    settings: {
      messageInterval: false,
      prefix: 'nigger;'
    }
  });

  let guild = {
    storage: client.storage.get(`guilds.${message.parsed.args[0]}`),
    ...client.guilds.find((guild) => guild.id === message.parsed.args[0])
  };

  if (guild.storage.blacklisted === true) {
    client.storage.set(`guilds.${message.parsed.args[0]}.blacklisted`, false);

    return message.channel.send({
      embed: {
        'title': 'Server unblacklisted',
        'description': `\`${message.parsed.args[0]}\` has been unblacklisted.`,
        'color': 8912896,
        'footer': {
          'text': `${message.author.username} (${message.author.id})`
        }
      }
    });
  } else if (guild.storage.blacklisted === false) {
    client.storage.set(`guilds.${message.parsed.args[0]}.blacklisted`, true);

    if (guild.id && !guild.deleted) guild.leave();

    return message.channel.send({
      embed: {
        'title': 'Server blacklisted',
        'description': `\`${message.parsed.args[0]}\` has been blacklisted.`,
        'color': 8912896,
        'footer': {
          'text': `${message.author.username} (${message.author.id})`
        }
      }
    });
  };
};

module.exports.meta = {
  name: 'blacklist',
  aliases: ['blacklist', 'bl'],
  usage: '<alias> <id>',
  description: 'Blacklists or unblacklists a specific guild',
  permission: 2
};