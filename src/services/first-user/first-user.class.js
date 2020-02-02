const { Service } = require('feathers-sequelize');

exports.FirstUser = class FirstUser extends Service {
  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const { total } = await this.app.service('first-user').find();
    if (total) { throw new Error('First user already created!'); }
    const { email, password, nickname, roles } = data;
    const userData = {
      email,
      password,
      nickname,
      roles: roles ? roles : [{ code: 'admin', name: 'Administrator' }]
    };
    return super.create(userData, params);
  }
};
