const { authenticate } = require('@feathersjs/authentication').hooks;

const { protect } = require('@feathersjs/authentication-local').hooks;

const projectsRelationships = require('../../hooks/projects_relationships');

const projectBeforeCreate = require('../../hooks/project_before_create');

module.exports = {
  before: {
    all: [authenticate('jwt'),],
    find: [projectsRelationships()],
    get: [projectsRelationships()],
    create: [projectBeforeCreate(), projectsRelationships()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [protect('project_roles.users.password')],
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
