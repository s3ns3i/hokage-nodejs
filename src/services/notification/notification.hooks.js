const { authenticate } = require('@feathersjs/authentication').hooks;

const denyAccess = require('../../hooks/deny-access');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [denyAccess()],
    create: [],
    update: [denyAccess()],
    patch: [denyAccess()],
    remove: []
  },

  after: {
    all: [],
    find: [],
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
