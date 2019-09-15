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
  
  eval(message.parsed.args.join(' '));
};

module.exports.meta = {
  name: 'eval',
  aliases: ['eval'],
  usage: '<alias> <code>',
  description: 'Evaluates given string and executes it as JavaScript',
  permission: 99
};