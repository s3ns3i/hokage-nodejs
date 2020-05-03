const { authenticate } = require('@feathersjs/authentication').hooks;

const relationships = require('../../hooks/project/relationships');

const createAssociations = require('../../hooks/project/create_associations');

const removeAssociations = require('../../hooks/project/remove_associations');

const denyAccess = require('../../hooks/deny-access');

const updateAssociations = require('../../hooks/project/update_associations');

module.exports = {
  before: {
    all: [authenticate('jwt'),],
    find: [relationships()],
    get: [relationships()],
    create: [],
    update: [removeAssociations()],
    patch: [removeAssociations()],
    remove: [denyAccess()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createAssociations()],
    update: [updateAssociations()],
    patch: [updateAssociations()],
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
