// Initializes the `project_role` service on path `/project-role`
const { ProjectRole } = require('./project_role.class');
const createModel = require('../../models/project_role.model');
const hooks = require('./project_role.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/project-role', new ProjectRole(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-role');

  service.hooks(hooks);
};
