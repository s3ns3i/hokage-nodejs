// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data && context.data.roles) {
      const Roles = context.app.services.roles.Model;
      context.params.sequelize = { include: [{ model: Roles, required: false }] };
    }
    return context;
  };
};
