// Initializes the `first-user` service on path `/first-user`
const { FirstUser } = require('./first-user.class');
const createModel = require('../../models/first-user.model');
const hooks = require('./first-user.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/first-user', new FirstUser(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('first-user');

  service.hooks(hooks);
};
