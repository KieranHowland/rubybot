const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    _id: String,
    permission: {
      type: Number,
      default: 1
    },
    names: [
      {
        username: {
          type: String
        },
        changed: {
          type: Date
        }
      }
    ],
    punishments: [
      {
        id: {
          type: String
        },
        guild: {
          type: String
        },
        type: {
          type: String
        },
        expire: {
          type: Date
        }
      }
    ]
  },
  {
    collection: 'users'
  }
);