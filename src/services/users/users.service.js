// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const { FirstUser } = require('./first-user.class');
const createModel = require('../../models/users.model');
const usersHooks = require('./users.hooks');
const firstUserHooks = require('./first-user.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  app.use('/users/first-user', new FirstUser(options, app));

  // Get our initialized service so that we can register hooks
  const usersService = app.service('users');
  const firstUserService = app.service('/users/first-user');

  usersService.hooks(usersHooks);
  firstUserService.hooks(firstUserHooks);
};
