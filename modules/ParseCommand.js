module.exports = (message, prefix) => {
  let parsed = {
    alias: '',
    args: []
  };

  parsed.args = message.slice(prefix.length).trim().split(/ +/g);
  parsed.alias = parsed.args.shift().toLowerCase();

  return parsed;
};