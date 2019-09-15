module.exports = class EventHandler {
  constructor(client) {
    if (!client) throw Error('Missing client parameter');
    
    this.client = client;
  };

  register(file) {
    if (!file) throw Error('Missing file parameter');

    if (typeof file !== 'object') throw TypeError('Expected file parameter to be an object, got ' + typeof file);

    if (!file.execute) throw Error('Event file missing execute export');
    if (!file.type) throw Error('Event file missing type export');

    if (typeof file.type !== 'string') throw TypeError('Expected file.type to be a function, got ' + typeof file.type);
    if (typeof file.execute !== 'function') throw TypeError('Expected file.execute to be a function, got ' + typeof file.execute);

    return this.client.on(file.type, file.execute.bind(null, this.client));
  };
};