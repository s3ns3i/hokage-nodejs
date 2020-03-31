const { authenticate } = require('@feathersjs/authentication').hooks;

const projectRoleRelationships = require('../../hooks/project_role_relationships');

module.exports = {
  before: {
    all: [authenticate('jwt'), projectRoleRelationships()],
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
