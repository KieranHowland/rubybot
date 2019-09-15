module.exports.execute = (client, guild) => {
  for (let channel of guild.channels.array()) {
    if (channel.type !== 'text') continue;
    if (!channel.permissionsFor(client.user).has('VIEW_CHANNEL')) continue;
    if (!channel.permissionsFor(client.user).has('SEND_MESSAGES')) continue;
    
    return channel.send('**Ruby has arrived!**\n\nSay `ruby help` to find out how to use me');
  };
};

module.exports.type = 'guildCreate';