const { authenticate } = require('@feathersjs/authentication').hooks;

const rolesRelationships = require('../../hooks/roles_relationships');

module.exports = {
  before: {
    all: [authenticate('jwt'), rolesRelationships()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
