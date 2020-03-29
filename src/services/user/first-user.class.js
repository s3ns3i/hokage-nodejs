const { Service } = require('feathers-sequelize');

exports.FirstUser = class FirstUser extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async create(data, params) {
    const response = await this.app.service('user').find();
    if (response.data.length) { throw new Error('First user already created!'); }

    const Role = this.app.services.role.Model;
    params.sequelize = { include: [Role] };
    const { email, password, nickname } = data;
    const roles = [{ name: 'Administrator' }];
    const userData = {
      email,
      password,
      nickname,
      roles,
    };
    return super.create(userData, params);
  }
};
