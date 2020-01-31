const { Service } = require('feathers-sequelize');

exports.FirstUser = class FirstUser extends Service {
  create(data, params) {
    console.log('hello from overriden create method in users');
    const { email, password, nickname, roles } = data;
    const userData = {
      email,
      password,
      nickname,
      roles: roles ? roles : [{ code: 'admin', name: 'Administrator' }]
    };
    console.log(userData.roles);
    return super.create(userData, params);
  }
};
