const { Service } = require('feathers-sequelize');

exports.FirstUser = class FirstUser extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async create(data, params) {
    const { total } = await this.app.service('users').find();
    if (total) { throw new Error('First user already created!'); }

    const Role = this.app.services.roles.Model;
    params.sequelize = { include: [Role] };
    const { email, password, nickname } = data;
    const roles = [{ code: 'admin', name: 'Administrator' }];
    const userData = {
      email,
      password,
      nickname,
      roles,
    };
    return super.create(userData, params);
  }
};
