// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const User = context.app.services.user.Model;
    const Role = context.app.services.role.Model;
    context.params.sequelize = { raw: false, include: { model: Role, include: User } };
    return context;
  };
};
