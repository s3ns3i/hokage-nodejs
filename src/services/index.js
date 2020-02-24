const users = require('./users/users.service.js');
const roles = require('./roles/roles.service.js');
const projects = require('./projects/projects.service.js');
const tasks = require('./tasks/tasks.service.js');
const transitions = require('./transitions/transitions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(roles);
  app.configure(projects);
  app.configure(tasks);
  app.configure(transitions);
};
