module.exports.execute = (client, message) => {
  if (message.parsed.args[0]) {
    let command = client.commands.find(message.parsed.args[0]);

    if (!command) return message.channel.send({
      embed: {
        'title': 'Command error',
        'description': 'That command does not exist',
        'color': 8912896,
        'footer': {
          'text': `${message.author.username} (${message.author.id})`
        }
      }
    });

    return message.channel.send({
      embed: {
        'title': 'Command info for ' + message.parsed.args[0],
        'description': `Aliases: \`${command.meta.aliases.map((alias) => `'${alias}'`).join(', ')}\`
Usage: \`${command.meta.usage || 'No usage information'}\`
Description: \`${command.meta.description + '.'}\`
Permission Requirement: \`${client.modules.UppercaseString(client.constants.permissions.alias[command.meta.permission]) || '?'}\` \`(${command.meta.permission})\``,
        'color': 8912896,
        'footer': {
          'text': `${message.author.username} (${message.author.id})`
        }
      }
    });
  };

  return message.channel.send({
    embed: {
      'title': 'Help',
      'color': 8912896,
      'fields': [{
          'name': 'Usage',
          'value': `Server prefix: \`${client.storage.get(`guilds.${message.guild.id}.settings.prefix`)}\`
Command syntax: \`${message.guild.settings.prefix}<alias> [...args]\``,
          'inline': false
        },
        {
          'name': 'Commands',
          'value': client.commands.array().sort((command) => command.meta.permission).map((command) => `${command.meta.aliases.map((alias) => `\`${alias}\``).join(', ')} - ${command.meta.description + '.'}`).join('\n'),
          'inline': false
        }
      ],
      'footer': {
        'text': `${message.author.username} (${message.author.id})`
      }
    }
  });
};

module.exports.meta = {
  name: 'help',
  usage: '<alias> [command]',
  aliases: ['help', '?'],
  description: 'Returns server prefix, command syntax and a list of commands. Can also return individual command information',
  permission: 1
};