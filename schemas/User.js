const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    _id: String,
    names: [
      {
        username: String,
        changed: Date
      }
    ],
    punishments: [
      {
        id: String,
        guild: String,
        type: String,
        expire: Date
      }
    ]
  },
  {
    collection: 'users'
  }
);