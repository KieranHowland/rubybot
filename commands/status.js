const moment = require('moment');

module.exports.execute = (client, message) => {
  return message.channel.send({
    embed: {
      'title': 'Status information',
      'description': `Websocket Ping: \`${Math.floor(client.ping)}ms\`
Client Status: \`${client.modules.UppercaseString(client.constants.status[client.status])}\`
Uptime: \`${moment.duration(client.uptime, 'milliseconds').days()} Days, ${moment.duration(client.uptime, 'milliseconds').hours()} Hours, ${moment.duration(client.uptime, 'milliseconds').minutes()} Minutes and ${moment.duration(client.uptime, 'milliseconds').seconds()} Seconds\``,
      'color': 8912896,
      'footer': {
        'text': `${message.author.username} (${message.author.id})`
      }
    }
  });
};

module.exports.meta = {
  name: 'status',
  aliases: ['status', 'ngr'],
  usage: '<alias>',
  description: 'Returns the bot status alongside other live information',
  permission: 99
};