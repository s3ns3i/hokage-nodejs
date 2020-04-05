const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const userRelationships = require('../../hooks/user_relationships');

const afterUserAssociations = require('../../hooks/after_user_associations');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), userRelationships()],
    get: [authenticate('jwt'), userRelationships()],
    create: [hashPassword('password'), authenticate('jwt')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt'), userRelationships()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [afterUserAssociations()],
    update: [afterUserAssociations()],
    patch: [afterUserAssociations()],
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
