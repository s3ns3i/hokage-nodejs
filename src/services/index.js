const user = require('./user/user.service.js');
const role = require('./role/role.service.js');
const project = require('./project/project.service.js');
const task = require('./task/task.service.js');
const transition = require('./transition/transition.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(role);
  app.configure(project);
  app.configure(task);
  app.configure(transition);
};
