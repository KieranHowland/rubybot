const mongoose = require('mongoose');

const schemas = require('../schemas');
const User = mongoose.model('user', schemas.User);
const Guild = mongoose.model('guild', schemas.Guild);

let Command = class Command {
  constructor(name, execute, meta) {
    if (!name) throw Error('Missing name parameter');
    if (!execute) throw Error('Missing execute parameter');
    if (!meta) throw Error('Missing meta parameter');

    if (typeof name !== 'string') throw TypeError('Expected name parameter to be a string, got ' + typeof name);
    if (typeof execute !== 'function') throw TypeError('Expected expected parameter to be a function, got ' + typeof execute);
    if (typeof meta !== 'object') throw TypeError('Expected meta parameter to be an object, got ' + typeof meta);

    this.name = name;
    this.execute = execute;
    this.meta = meta;
  };
};

module.exports = class CommandHandler {
  constructor(client) {
    this.commands = [];

    client.on('message', this.handler.bind(null, client));
  };

  register(file) {
    if (!file) throw Error('Missing file parameter');

    if (typeof file !== 'object') throw TypeError('Expected file parameter to be an object, got ' + typeof file);

    if (!file.execute) throw Error('Command file missing execute export');
    if (!file.meta) throw Error('Command file missing meta export');

    if (typeof file.execute !== 'function') throw TypeError('Expected file.execute to be a function, got ' + typeof file.execute);
    if (typeof file.meta !== 'object') throw TypeError('Expected file.meta to be an object, got ' + typeof file.meta);

    if (!file.meta.name) throw Error('Command file missing name meta key');
    if (!file.meta.usage) console.warn('Command file missing usage meta key');
    if (!file.meta.description) console.warn('Command file missing description key');
    if (!file.meta.permission) console.warn('Command file missing permission meta key, set to 99 for security');

    for (let command of this.commands) {
      if (command.name === file.meta.name) throw Error('A command with that name has already been registered');
    };

    return this.commands.push(new Command(file.meta.name.toLowerCase(), file.execute, {
      aliases: file.meta.aliases || [file.meta.name.toLowerCase()],
      usage: file.meta.usage || undefined,
      description: file.meta.description || undefined,
      permission: file.meta.permission || 99,
      registered: Date.now()
    }));
  };

  unregister(name) {
    if (!name) throw Error('Missing name parameter');

    if (typeof name !== 'string') throw TypeError('Expected name parameter to be a string, got ' + typeof name);

    for (let command of this.commands) {
      if (command.name === name) return this.commands.splice(command, 1);
    };
  };

  find(alias) {
    if (!alias) throw Error('Mssing alias parameter');

    if (typeof alias !== 'string') throw TypeError('Expected alias parameter to be a string, got ' + typeof alias);

    for (let command of this.commands) {
      if (command.meta.aliases.indexOf(alias) <= -1) continue;

      return command;
    };

    return;
  };

  array() {
    return this.commands;
  };

  handler(client, message) {
    if (!client.cache.guilds[message.guild.id]) Guild.findById(message.guild.id, (err, guild) => {
      if (err) return;

      if (!guild) Guild.create({
        _id: message.guild.id
      }, (err) => {
        if (err) return;
        return client.cache.guilds[message.guild.id].prefix = process.env.PREFIX;
      });

      return message.guild.settings.prefix = guild.settings.prefix;
    });

    message.parsed = client.modules.ParseCommand(message.content, message.guild.settings.prefix);
    if (message.parsed.alias) message.command = client.commands.find(message.parsed.alias);

    if (!message.command && message.parsed.prefix) return message.channel.send({
      embed: {
        'title': 'Command error',
        'description': 'That command does not exist',
        'color': 8912896
      }
    });

    if (!message.command) return;

    if (!message.command.meta.permission > message.author.storage.permission) return message.channel.send({
      embed: {
        'title': 'Permission error',
        'description': `You do not have permission to execute ${message.content}`,
        'color': 8912896
      }
    });

    message.command.execute(client, message);
  };
};