const { authenticate } = require('@feathersjs/authentication').hooks;

const relationships = require('../../hooks/project/relationships');

const createAssociations = require('../../hooks/project/create_associations');

const removeAssociations = require('../../hooks/project/remove_associations');

const denyAccess = require('../../hooks/deny-access');

const sortProjectRolesByOrder = require('../../hooks/sort_project_roles_by_order');

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
    find: [sortProjectRolesByOrder()],
    get: [sortProjectRolesByOrder()],
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
