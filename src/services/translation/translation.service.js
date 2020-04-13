// Initializes the `translation` service on path `/translation`
const { Translation } = require('./translation.class');
const createModel = require('../../models/translation.model');
const hooks = require('./translation.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/translation', new Translation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('translation');

  service.hooks(hooks);
};
