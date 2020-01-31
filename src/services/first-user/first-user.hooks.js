

const firstUserRelationships = require('../../hooks/first-user_denied');

const firstUserTotal = require('../../hooks/first-user_total');

const { hashPassword } = require('@feathersjs/authentication-local').hooks;

const userRelationships = require('../../hooks/users_relationships');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [firstUserRelationships()],
    create: [hashPassword('password'), userRelationships()],
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
