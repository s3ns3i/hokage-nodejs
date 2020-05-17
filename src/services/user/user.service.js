// Initializes the `user` service on path `/user`
const { User } = require('./user.class');
const { FirstUser } = require('./first-user.class');
const { UsersProjects } = require('./users-projects.class');
const createModel = require('../../models/user.model');
const usersHooks = require('./user.hooks');
const firstUserHooks = require('./first-user.hooks');
const usersProjectsHooks = require('./users-projects.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user', new User(options, app));
  app.use('/user/first-user', new FirstUser(options, app));
  app.use('/user/users-projects', new UsersProjects(options, app));

  // Get our initialized service so that we can register hooks
  const usersService = app.service('user');
  const firstUserService = app.service('/user/first-user');
  const usersProjectsService = app.service('/user/users-projects');

  usersService.hooks(usersHooks);
  firstUserService.hooks(firstUserHooks);
  usersProjectsService.hooks(usersProjectsHooks);
};
