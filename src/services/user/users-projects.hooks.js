const { authenticate } = require('@feathersjs/authentication').hooks;

const { protect } = require('@feathersjs/authentication-local').hooks;

const usersProjectsRelationships = require('../../hooks/user/users-projects_relationships');
const denyAccess = require('../../hooks/deny-access');
const usersProjectsMap = require('../../hooks/user/users-projects_map');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), usersProjectsRelationships()],
    get: [denyAccess()],
    create: [denyAccess()],
    update: [denyAccess()],
    patch: [denyAccess()],
    remove: [denyAccess()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [usersProjectsMap()],
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
