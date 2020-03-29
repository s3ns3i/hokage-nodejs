const { Service } = require('feathers-sequelize');

exports.FirstUser = class FirstUser extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async create(data, params) {
    const { total } = await this.app.service('user').find();
    if (total) { throw new Error('First user already created!'); }

    const Role = this.app.services.role.Model;
    params.sequelize = { include: [Role] };
    const { email, password, nickname } = data;
    const role = [{ code: 'admin', name: 'Administrator' }];
    const userData = {
      email,
      password,
      nickname,
      role,
    };
    return super.create(userData, params);
  }
};
