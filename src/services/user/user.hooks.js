const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const denyAccess = require('../../hooks/deny-access');

const userRelationships = require('../../hooks/user/relationships');

const createAssociations = require('../../hooks/user/create_associations');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), userRelationships()],
    get: [authenticate('jwt'), userRelationships()],
    create: [hashPassword('password'), authenticate('jwt')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [denyAccess()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [createAssociations()],
    update: [createAssociations()],
    patch: [createAssociations()],
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
