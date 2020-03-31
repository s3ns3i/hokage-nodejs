// Initializes the `user_project_role` service on path `/user-project-role`
const { UserProjectRole } = require('./user_project_role.class');
const createModel = require('../../models/user_project_role.model');
const hooks = require('./user_project_role.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-project-role', new UserProjectRole(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-project-role');

  service.hooks(hooks);
};
