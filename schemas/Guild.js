const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    settings: {
      prefix: {
        type: String,
        maxlength: 8,
        default: process.env.PREFIX
      }
    },
    blacklisted: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'guilds'
  }
);