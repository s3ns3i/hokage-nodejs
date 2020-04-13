const { authenticate } = require('@feathersjs/authentication').hooks;

const projectsRelationships = require('../../hooks/projects_relationships');

const afterCreate = require('../../hooks/project/create_associations');

module.exports = {
  before: {
    all: [authenticate('jwt'),],
    find: [projectsRelationships()],
    get: [projectsRelationships()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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
