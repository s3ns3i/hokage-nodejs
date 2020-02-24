// Initializes the `transitions` service on path `/transitions`
const { Transitions } = require('./transitions.class');
const createModel = require('../../models/transitions.model');
const hooks = require('./transitions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transitions', new Transitions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transitions');

  service.hooks(hooks);
};
