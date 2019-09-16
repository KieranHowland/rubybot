require('dotenv').config();

const mongoose = require('mongoose');
const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client();

mongoose.connect('mongodb://localhost:27017/ruby', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to database!');
});

client.modules = require('./modules');
client.schemas = require('./schemas');

client.commands = new client.modules.CommandHandler(client);
client.events = new client.modules.EventHandler(client);

client.cache = {
  guilds: [],
  users: []
};

for (let file of fs.readdirSync(`${__dirname}/events`)) {
  client.events.register(require(`${__dirname}/events/${file}`));
};

for (let file of fs.readdirSync(`${__dirname}/commands`)) {
  client.commands.register(require(`${__dirname}/commands/${file}`));
};

client.login(process.env.TOKEN);