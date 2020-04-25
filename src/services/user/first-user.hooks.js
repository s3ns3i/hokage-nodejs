const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const userRelationships = require('../../hooks/user/relationships');
const denyAccess = require('../../hooks/deny-access');
const firstUserTotalHook = require('../../hooks/user/first-user_total');
const afterCreate = require('../../hooks/user/first-user_after_create');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [denyAccess()],
    create: [hashPassword('password'), userRelationships()],
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
    find: [firstUserTotalHook()],
    get: [],
    create: [afterCreate()],
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
