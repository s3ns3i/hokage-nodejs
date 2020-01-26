const users = require('./users/users.service.js');
const roles = require('./roles/roles.service.js');
const firstUser = require('./first-user/first-user.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(roles);
  app.configure(firstUser);
};
