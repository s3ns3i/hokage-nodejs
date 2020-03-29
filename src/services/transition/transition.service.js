// Initializes the `transition` service on path `/transition`
const { Transition } = require('./transition.class');
const createModel = require('../../models/transition.model');
const hooks = require('./transition.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transition', new Transition(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transition');

  service.hooks(hooks);
};
