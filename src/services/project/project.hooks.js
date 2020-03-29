const { authenticate } = require('@feathersjs/authentication').hooks;

const projectsRelationships = require('../../hooks/projects_relationships');

module.exports = {
  before: {
    all: [authenticate('jwt'), projectsRelationships()],
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
