const { authenticate } = require('@feathersjs/authentication').hooks;

const taskRelationships = require('../../hooks/task_relationships');

const afterTaskAssociations = require('../../hooks/after_task_associations');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [taskRelationships()],
    get: [taskRelationships()],
    create: [],
    update: [],
    patch: [],
    remove: [taskRelationships()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [afterTaskAssociations()],
    update: [afterTaskAssociations()],
    patch: [afterTaskAssociations()],
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
