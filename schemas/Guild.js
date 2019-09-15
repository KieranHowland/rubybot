const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    _id: String,
    settings: {
      prefix: {
        type: String,
        maxlength: 8,
        required: false
      }
    },
    blacklisted: {
      type: Boolean
    }
  },
  {
    collection: 'users'
  }
);