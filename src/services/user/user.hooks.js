const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const usersRelationships = require('../../hooks/users_relationships');

const afterAssociations = require('../../hooks/afterAssociations');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), usersRelationships()],
    get: [authenticate('jwt'), usersRelationships()],
    create: [hashPassword('password'), authenticate('jwt')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt'), usersRelationships()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [afterAssociations()],
    update: [afterAssociations()],
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
