const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    _id: {
      type: String // TODO Add some sort of default _id value.
    },
    event: {
      type: Object
    }
  },
  {
    collection: 'events'
  }
);

// ! This schema is unused