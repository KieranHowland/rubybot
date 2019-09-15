module.exports.execute = (client, message) => {
  return message.channel.send({
    embed: {
      'title': 'Bot statistics',
      'description': `Guild Count: \`${client.guilds.size}\`
Member Count: \`${client.users.size}\`
Text Channel Count: \`${client.channels.filter((channel) => channel.type === 'text').size}\`
Voice Channel Count: \`${client.channels.filter((channel) => channel.type === 'voice').size}\``,
      'color': 8912896,
      'footer': {
        'text': `${message.author.username} (${message.author.id})`
      }
    }
  });
};

module.exports.meta = {
  name: 'stats',
  aliases: ['stats', 'stat', 'statistics'],
  usage: '<alias>',
  description: 'Returns statistical information about ngr',
  permission: 1
};