const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const userRelationships = require('../../hooks/user/relationships');
const firstUserDeniedHook = require('../../hooks/user/first-user_denied');
const firstUserTotalHook = require('../../hooks/user/first-user_total');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [firstUserDeniedHook()],
    create: [hashPassword('password'), userRelationships()],
    update: [firstUserDeniedHook()],
    patch: [firstUserDeniedHook()],
    remove: [firstUserDeniedHook()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [firstUserTotalHook()],
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
