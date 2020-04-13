const { authenticate } = require('@feathersjs/authentication').hooks;

const taskRelationships = require('../../hooks/task/relationships');

const afterTaskAssociations = require('../../hooks/task/after_associations');

const taskBeforeCreate = require('../../hooks/task/before_create');

const taskBeforeAll = require('../../hooks/task/before_all');

module.exports = {
  before: {
    all: [authenticate('jwt'), taskBeforeAll()],
    find: [taskRelationships()],
    get: [taskRelationships()],
    create: [taskBeforeCreate()],
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
