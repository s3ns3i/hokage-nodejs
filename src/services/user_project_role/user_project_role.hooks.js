const { authenticate } = require('@feathersjs/authentication').hooks;

const userProjectRoleRelationships = require('../../hooks/user_project_role_relationships');

module.exports = {
  before: {
    all: [authenticate('jwt'), userProjectRoleRelationships()],
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
