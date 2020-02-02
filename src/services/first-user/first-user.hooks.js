

const firstUserDenied = require('../../hooks/first-user_denied');

const firstUserTotal = require('../../hooks/first-user_total');

const { hashPassword } = require('@feathersjs/authentication-local').hooks;

const userRelationships = require('../../hooks/users_relationships');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [firstUserDenied()],
    create: [hashPassword('password'), userRelationships()],
    update: [firstUserDenied()],
    patch: [firstUserDenied()],
    remove: [firstUserDenied()]
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
