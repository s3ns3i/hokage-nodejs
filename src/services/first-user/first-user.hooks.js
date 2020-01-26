

const firstUserRelationships = require('../../hooks/first-user_denied');

const firstUserTotal = require('../../hooks/first-user_total');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [firstUserRelationships()],
    create: [firstUserRelationships()],
    update: [firstUserRelationships()],
    patch: [firstUserRelationships()],
    remove: [firstUserRelationships()]
  },

  after: {
    all: [],
    find: [firstUserTotal()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
