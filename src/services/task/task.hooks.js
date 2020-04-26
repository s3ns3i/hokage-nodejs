const { authenticate } = require('@feathersjs/authentication').hooks;

const taskRelationships = require('../../hooks/task/relationships');

const denyAccess = require('../../hooks/deny-access');

const afterCreateAssociations = require('../../hooks/task/after_create_associations');

const afterUpdateAssociations = require('../../hooks/task/after_update_associations');

const taskBeforeCreate = require('../../hooks/task/before_create');

const beforeUpdate = require('../../hooks/task/before_update');

const taskBeforeAll = require('../../hooks/task/before_all');

const afterCreateNotification = require('../../hooks/task/after_create_notification');

const afterUpdateNotification = require('../../hooks/task/after_update_notification');

module.exports = {
  before: {
    all: [authenticate('jwt'), taskBeforeAll()],
    find: [taskRelationships()],
    get: [taskRelationships()],
    create: [taskBeforeCreate()],
    update: [beforeUpdate()],
    patch: [beforeUpdate()],
    remove: [denyAccess()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [afterCreateAssociations(), afterCreateNotification()],
    update: [afterUpdateAssociations(), afterUpdateNotification()],
    patch: [afterUpdateAssociations(), afterUpdateNotification()],
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
